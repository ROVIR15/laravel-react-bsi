<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use DB;

use App\Models\Manufacture\BOM;
use App\Models\Manufacture\Operation;
use App\Models\Manufacture\BOMItem;
use App\Models\Manufacture\BOMService;

use App\Http\Resources\Manufacture\BOM as BOMOneCollection;
use App\Http\Resources\Manufacture\BOMCollection;
use App\Models\Invoice\Payment;
use App\Models\Invoice\PaymentHasInvoice;
use App\Models\KITE\ImportDoc;
use App\Models\Order\OrderItem;
use App\Models\Order\PurchaseOrder;
use Illuminate\Http\Request;

class BOMController extends Controller
{
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
        $query = BOM::with('currency_info', 'party')->whereHas('status', function ($query3) {
          $query3->whereIn('status_type', ['Approve', 'Review', 'Reject Approve', 'Reject Review']);
        })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
        break;

      case 'review':
        # code...
        $query = BOM::with('currency_info', 'party')->whereHas('status', function ($query3) {
          $query3->whereIn('status_type', ['Review', 'Submit', 'Reject Review']);
        })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
        break;

      default:
        # code...
        $query = BOM::with('status', 'currency_info', 'party')
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
        break;
    }

    // return response()->json([$query, $thruDate, $fromDate]);
    return new BOMCollection($query);
  }

  public function bomList()
  {
    try {
      $query = BOM::with('party')->get();
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json(['data' => $query]);
  }

  public function bomBuyer()
  {
    try {
      $query = BOM::with('');
    } catch (\Throwable $th) {
      //throw $th;
    }
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

  public function getBOMMaterials()
  {
    try {
      $query = BOM::select('id', 'name')
        ->with(['bom_items' => function ($query) {
          return $query->select('id', 'bom_id', 'product_id', 'product_feature_id', 'qty', 'consumption', 'allowance', 'unit_price')->with('product_feature');
        }])
        ->get()
        ->map(function ($item) {
          $data = (array) $item->bom_items;
          $items = [];

          if (isset($data) && is_array($data)) {
            foreach ($item->bom_items as $next) {
              $productFeature = $next->product_feature;
              $product = $productFeature ? $productFeature->product : null;
              $goods = $product ? $product->goods : null;

              $items[] = [
                'id' => $next->id,
                'product_feature_id' => $productFeature ? $productFeature->id : null,
                'product_id' => $product ? $product->id : null,
                'goods_id' => $goods ? $goods->id : null,
                'allowance' => $next->allowance,
                'consumption' => $next->consumption,
                'unit_price' => $next->unit_price,
                'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                'unit_measurement' => $goods ? $goods->satuan : null,
              ];
            }
          }

          return [
            'id' => $item->id,
            'name' => $item->name,
            'bom_items' => $items,
          ];
        });
    } catch (\Throwable $th) {
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $query
    ]);
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
    $current_date_time = Carbon::now()->toDateTimeString();

    try {
      DB::beginTransaction();
      //BOM Creation
      $billOfMaterial = BOM::create([
        'currency_id' => $param['currency_id'],
        'product_id' => $param['product_id'],
        'product_feature_id' => $param['product_feature_id'],
        'party_id' => $param['party_id'],
        'name' => $param['name'],
        'qty' => $param['qty'],
        'margin' => $param['margin'],
        'tax' => $param['tax'],
        'starting_price' => $param['starting_price'],
        'start_date' => $param['start_date'],
        'end_date' => $param['end_date'],
        'company_name' => $param['company_name']
      ]);

      DB::commit();

      if (!is_array($param['components']) && count($param['components']) === 0) {
        throw new Exception("Not found");
      }

      $bomItemsCreation = [];

      foreach ($param['components'] as $key) {
        array_push($bomItemsCreation, [
          'bom_id' => $billOfMaterial['id'],
          'product_id' => $key['product_id'],
          'product_feature_id' => $key['product_feature_id'],
          'qty' => floatval($key['consumption']) + floatval($key['allowance']),
          'consumption' => $key['consumption'],
          'allowance' => $key['allowance'],
          'unit_price' => $key['unit_price'],
        ]);
      }

      BOMItem::insert($bomItemsCreation);
      DB::commit();


      if (!is_array($param['services']) && count($param['services']) === 0) {
        throw new Exception("Not found");
      }

      $servicesCreation = [];

      foreach ($param['services'] as $key) {
        array_push($servicesCreation, [
          'product_id' => $key['product_id'],
          'bom_id' => $billOfMaterial['id'],
          'unit_price' => $key['unit_price'],
        ]);
      }

      BOMService::insert($servicesCreation);
      DB::commit();

      if (!is_array($param['operations']) && count($param['operations']) === 0) {
        throw new Exception("Not found");
      }

      $operationsCreation = [];

      foreach ($param['operations'] as $key) {
        array_push($operationsCreation, [
          'name' => $key['name'],
          'seq' => $key['seq'],
          'work_center_id' => $key['work_center_id'],
          'bom_id' => $billOfMaterial['id'],
          'created_at' => $current_date_time
        ]);
      }

      Operation::insert($operationsCreation);
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
      'title' => 'CBD Document Creation',
      'message' => 'The new CBD document has been created #' . $billOfMaterial->id,
      'link' => '/production/costing/' . $billOfMaterial->id,
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
      //code...
      $query = BOM::with(
        'currency_info',
        'bom_items',
        'bom_services',
        'operation',
        'product',
        'variant',
        'status',
        'party'
      )
        ->find($id);

      $arr_item = BOMItem::select('id')->where('bom_id', $id)->get()->map(function ($item) {
        return $item->id;
      });

      $arr_order = OrderItem::select('id','order_id', 'product_feature_id', 'product_id', 'qty')
        ->with(['order' => function($query) {
          return $query->with('purchase_order');
        }])
        ->with(['import_info' => function($query) {
          return $query->with('doc');
        }])
        ->with('shipment_item', 'invoice', 'product_feature')
        ->whereIn('costing_item_id', $arr_item)
        ->get()
        ->map(function($item) {
          $order = $item->order ? $item->order : null;
          $purchaseOrder = $order ? $order->purchase_order : null;
          $import_info = $item->import_info ? $item->import_info : null;
          $invoice = $item->invoice ? $item->invoice : null;
          $import_doc = $import_info ? $import_info->doc : null;
          $shipmentItem = count($item->shipment_item) ? $item->shipment_item[0] : null;
          $shipment = $shipmentItem ? $shipmentItem->shipment : null;
          $productFeature = $item ? $item->product_feature : null;
          $product = $productFeature->product ? $productFeature->product : null;
          $goods = $product->goods ? $product->goods : null;

          $import_flag = $order->import_flag ? 2 : 1;

          $payment = $invoice ? PaymentHasInvoice::where('invoice_id', $invoice->id)->first() : 0;

          return [
            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'import_item_id' => $import_info ? $import_info->id : null,
            'import_id' => $import_info ? $import_info->kite_import_doc_id : null,
            'document_number' => $import_doc ? $import_doc->document_number : null,
            'qty' => $item->qty,
            'unit_measurement' => $goods->satuan,
            'order_item_id' => $item->id,
            'order_id' => $item->order->id,
            'purchase_order_id' => $purchaseOrder ? $purchaseOrder->id : null,
            'po_number' => $purchaseOrder ? $purchaseOrder->po_number : null,
            'import_flag' => $purchaseOrder ? ($purchaseOrder->import_flag ? 'Import' : 'Non-Import') : null,
            'shipment_item_id' => $shipmentItem ? $shipmentItem->id : null,
            'shipment_id' => $shipment ? $shipment->id : null,
            'invoice_id' => $invoice ? $invoice->id : null,
            'payment_id' => $payment ? $payment['payment_id'] : null
          ];
        });

      // $query2 = PurchaseOrder::select('id', 'po_number', 'order_id')->whereIn('order_id', $arr_order)->get();

      return response()->json([
        'success' => true,
        'data' => new BOMOneCollection($query),
        'items' => $arr_order
      ]);
    } catch (Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'err' => $th->getMessage()
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
    $param = $request->all()['payload'];
    try {
      //code...
      $query = BOM::find($id)->update($param);
    } catch (Exception $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'err' => $th->getMessage()
      ]);
    }
    return response()->json([
      'success' => true
    ]);
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
      BOM::find($id)->delete();
    } catch (Exception $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'err' => $th->getMessage()
      ]);
    }
    return response()->json([
      'success' => true
    ]);
  }
}
