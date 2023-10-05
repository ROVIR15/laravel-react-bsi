<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use DB;
use PDF;

use App\Models\Order\Order;
use App\Models\Order\OrderStatus;
use App\Models\Order\OrderItem;
use App\Models\Order\SalesOrder;
use App\Http\Controllers\Controller;
use App\Http\Resources\Order\SalesOrder as oneSalesOrder;
use App\Http\Resources\Order\SalesOrderCollection;
use App\Http\Resources\Order\SOView as oneSalesOrderView;
use App\Http\Resources\Order\SOViewCollection;
use App\Models\KITE\ExportDoc;
use App\Models\Order\POBuyerProof;
use Illuminate\Http\Request;

class SalesOrderController extends Controller
{

  public function get_export_so(Request $request)
  {
    $export_flag = $request->query('export_flag');
    $completion_status = $request->query('completion_status');

    if (!empty($completion_status) && $completion_status = 2) {
      $query = SalesOrder::with('completion_status')
        // ->whereHas('completion_status', function ($query2) {
        //   $query2->where('completion_status_id', 2);
        // })
        ->where('export_flag', $export_flag)
        ->get();
    } else {
      $query = SalesOrder::with('completion_status')
      ->where('export_flag', $export_flag)
      ->get();
    }

    if (isset($query) && is_array($query)) {
      $query = $query->map(function ($item) {
        return [
          'id' => $item->id,
          'po_number' => $item->po_number
        ];
      });
    }

    return new SOViewCollection($query);
  }

  /**
   * Display a listing of the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $query;
    $level = $request->query('level');
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');
    $monthYear = $request->query('monthYear');
    $completion_status = $request->query('completion_status');

    if (empty($level)) {
      if (!empty($completion_status) && $completion_status = 2) {
        $query = SalesOrder::with('completion_status')->whereHas('completion_status', function ($query2) {
          $query2->where('completion_status_id', 2);
        })->get();
      } else {
        $query = SalesOrder::with('status', 'sum', 'completion_status')->get();
      }

      return new SOViewCollection($query);
    }

    if (empty($fromDate) || empty($thruDate)) {
      $thruDate = date('Y-m-d');
      $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("8 days"));
      $fromDate = date_format($fromDate, 'Y-m-d');
    }

    if (empty($monthYear)) {
      $monthYear = date('Y-m');
    }

    $monthYear = date_create($monthYear);
    $month = date_format($monthYear, 'm');
    $year = date_format($monthYear, 'Y');

    switch ($level) {
      case 'approve':
        # code...
        $query = SalesOrder::with('order', 'completion_status', 'status', 'sum')->whereHas('status', function ($query2) {
          $query2->whereIn('status_type', ['Approve', 'Review', 'Reject Approve']);
        })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
        break;

      case 'review':
        # code...
        $query = SalesOrder::with('order', 'completion_status', 'status', 'sum')->whereHas('status', function ($query2) {
          $query2->whereIn('status_type', ['Review', 'Submit', 'Reject Review']);
        })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
        break;

      default:
        # code...
        $query = SalesOrder::with('order', 'completion_status', 'status', 'sum')
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
        break;
    }

    return new SOViewCollection($query);
  }

  public function getSalesOrderList()
  {
    try {
      $query = SalesOrder::with('completion_status', 'status', 'sum')->get();
    } catch (\Throwable $th) {
      //throw $th;

      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return new SOViewCollection($query);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $param = $request->all()['payload'];
    try {
      DB::beginTransaction();
      //Order Creation
      $order = Order::create([
        'quote_id' => $param['quote_id'],
        'currency_id' => $param['currency_id'],
        'tax' => $param['tax']
      ]);

      DB::commit();

      $salesOrder = SalesOrder::create([
        'order_id' => $order->id,
        'quote_id' => $param['quote_id'],
        'export_flag' => $param['export_flag'],
        'po_number' => $param['po_number'],
        'sold_to' => $param['sold_to'],
        'ship_to' => $param['ship_to'],
        'delivery_date' => $param['delivery_date'],
        'issue_date' => $param['issue_date'],
        'valid_thru' => $param['valid_thru']
      ]);
      DB::commit();

      //Update order_id on Sales Order Resource
      $order->find($order->id)->update(['sales_order_id' => $salesOrder->id]);

      $salesItemsCreation = [];

      foreach ($param['order_items'] as $key) {
        array_push($salesItemsCreation, [
          'order_id' => $order['id'],
          'product_id' => $key['product_id'],
          'product_feature_id' => $key['product_feature_id'],
          'qty' => $key['qty'],
          'unit_price' => $key['unit_price'],
          'cm_price' => $key['cm_price'],
          'shipment_estimated' => date('Y-m-d', strtotime($key['shipment_estimated']))
        ]);
      }

      OrderItem::insert($salesItemsCreation);
      DB::commit();

      $imageUrl = $param['imageUrl'] ? $param['imageUrl'] : null;

      POBuyerProof::create([
        'tanggal_po' => $param['tanggal_po'],
        'nomor_po' => $param['nomor_po'],
        'sales_order_id' => $salesOrder->id,
        'order_id' => $order->id,
        'imageUrl' => $imageUrl
      ]);
      DB::commit();

    } catch (Exception $e) {
      //throw $th;
      DB::rollback();
      return response()->json(
        [
          'success' => false,
          'errors' => $e->getMessage()
        ],
        500
      );
    }

    return response()->json([
      'success' => true,
      'title' => 'Sales Order Creation',
      'message' => 'The new sales order has been created #' . $salesOrder->id,
      'link' => '/order/sales-order/' . $salesOrder->id,
    ], 200);
  }

  /**
   * Get sales order
   * 
   * @param \App\X
   */
  public function get_sales_order()
  {
    try {
      $query = SalesOrder::get()->map(function ($query) {
        return [
          'id' => $query['id'],
          'order_id' => $query['order_id'],
          'sales_order_id' => $query['id'],
          'po_number' => $query['po_number'],
          'name' => $query['po_number']
        ];
      });
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ], 500);
    }

    return response()->json([
      'success' => true,
      'data' => $query
    ], 200);
  }

  /**
   * Get Sales Order Item
   * 
   * @param $order_id
   */
  public function get_sales_order_items($order_id)
  {
    try {
      $query = OrderItem::with('product_feature')->where('order_id', $order_id)->get()->map(function ($query) {
        $productFeature = $query->product_feature;
        $productCategory = $productFeature ? $productFeature->product_category : null;
        $product = $productFeature ? $productFeature->product : null;
        $goods = $product ? $product->goods : null;

        return [
          'id' => $query['id'],
          'order_item_id' => $query['id'],
          'order_id' => $query['order_id'],
          'product_feature_id' => $productFeature['id'],
          'product_id' => $product['id'],
          'goods_id' => $goods['id'],
          'qty' => $query['qty'],
          'unit_measurement' => $goods ? $goods->satuan : null,
          'category_id' => $productCategory ? $productCategory->category->id : null,
          'category_name' => $productCategory ? $productCategory->category->name . ' - ' . $productCategory->category->sub->name : null,
          'category' => $productCategory ? $productCategory->category->name . ' - ' . $productCategory->category->sub->name : null,
          'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
          'name' => $goods ? $goods->name : null,
          'size' => $productFeature ? $productFeature->size : null,
          'color' => $productFeature ? $productFeature->color : null
        ];
      });
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ], 500);
    }

    return response()->json([
      'success' => true,
      'data' => $query
    ], 200);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    try {
      $salesOrder = SalesOrder::with('invoice', 'party', 'order_item', 'ship', 'status', 'completion_status', 'order', 'export_doc', 'order_proof', 'reconcile')->find($id);
      return new oneSalesOrder($salesOrder);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getError()
      ]);
    }
  }

  public function createPDF()
  {
    try {
      //code..
      $salesOrder = SalesOrder::all();

      // $pdf = PDF::loadview('apa.pdf',['order'=>$order]);

      return view('order_pdf', ['order' => $salesOrder]);
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ]);
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function edit(X $x)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function update($id, Request $request)
  {
    $salesOrderData = $request->all()['payload'];
    try {
      SalesOrder::find($id)->update($salesOrderData);
      return response()->json([
        'success' => true
      ], 200);
    } catch (Exception $e) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    try {
      SalesOrder::find($id)->delete();
      return response()->json(['success' => true]);
    } catch (Exception $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ]);
    }
  }

  /**
   * Validate sales-order param.
   * @param  Array  $data
   */
  // public function salesOrderValidator($data)
  // {
  //     return Validator::make($data, [
  //         'order_id' => 'required'
  //     ]);
  // }



}
