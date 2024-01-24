<?php

namespace App\Http\Controllers;

use App\Models\Inventory\GoodsMovement;
use DB;
use Illuminate\Http\Request;
use App\Models\Monitoring\Cutting;
use App\Models\Product\Goods;
use App\Models\Product\Product;
use App\Models\Product\ProductFeature;
use Exception;

class MonitoringCuttingController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $param = $request->has('sales-order');
    $order_id = $request->query('sales-order');
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');
    $query = [];

    if (empty($fromDate) || empty($thruDate)) {
      $thruDate = date('Y-m-d');
      $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
      $fromDate = date_format($fromDate, 'Y-m-d');
    }

    try {
      if ($param) {
        $query = Cutting::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, sum(output) as output')
          ->groupBy('po_number', 'sales_order_id', 'order_item_id')
          ->with('sales_order', 'product_feature')
          ->with(['sewing' => function ($query) use ($order_id) {
            return $query->where('order_id', $order_id);
          }])
          // ->whereHas('gmovement', function ($query) {
          //   return $query->select(DB::raw('id, product_feature_id, product_id, order_item_id, sum(qty) as qty'))
          //     ->groupBy('order_item_id')
          //     // ->where('qty', '>', 0);
          //     ->having(DB::raw('sum(qty)'), '>', 0);
          // })
          ->where('order_id', $request->query('sales-order'))
          ->orderBy('date', 'desc')
          ->get();
      } else {
        $query = Cutting::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, output')
          ->with('sales_order', 'product_feature')
          ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
          ->orderBy('id', 'desc')
          ->get();
      }
    } catch (Throwable $th) {
      return response()->json(['success' => false, 'error' => $th->getMessage()]);
    }

    return response()->json(['data' => $query]);
  }

  public function getCuttingSupermarket(Request $request)
  {
    $param = $request->has('sales-order');
    $order_id = $request->query('sales-order');
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');
    $query = [];

    if (empty($fromDate) || empty($thruDate)) {
      $thruDate = date('Y-m-d');
      $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
      $fromDate = date_format($fromDate, 'Y-m-d');
    }

    try {
      if ($param) {
        $query = Cutting::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, sum(output) as output')
          ->groupBy('po_number', 'sales_order_id', 'order_item_id')
          ->with('sales_order', 'product_feature')
          ->with(['supermarket' => function ($query) use ($order_id) {
            return $query->where('order_id', $order_id);
          }])
          ->where('order_id', $request->query('sales-order'))
          ->orderBy('date', 'desc')
          ->get();
      } else {
        $query = Cutting::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, output')
          ->with('sales_order', 'product_feature')
          ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
          ->orderBy('id', 'desc')
          ->get();
      }
    } catch (Throwable $th) {
      return response()->json(['success' => false, 'error' => $th->getMessage()]);
    }

    return response()->json(['data' => $query]);
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
      Cutting::insert($param);

      foreach ($param as $key) {
        # code...
        $this->goodsMovementRecords($key);
      }

      return response()->json(['success' => true]);
    } catch (Throwable $th) {
      //throw $th;
      return response()->json(
        [
          'success' => false,
          'errors' => $th->getMessage()
        ],
        500
      );
    }
  }

  public function goodsMovementRecords($key)
  {
    try {

      $product_feature = ProductFeature::find($key['product_feature_id']);

      if ($product_feature) {
        $product = Product::where('id', $product_feature->product_id)->get();

        if (!count($product)) {
          throw new Exception("Goods Not Found", 1);
        }

        GoodsMovement::create([
          'date' => $key['date'],
          'import_flag' => 0,
          'material_transfer_id' => null,
          'material_transfer_item_id' => null,
          'material_transfer_item_realisation_id' => null,
          'facility_id' => 6, //Cutting Room
          'goods_id' => $product[0]->goods_id,
          'product_id' => $product[0]->id,
          'product_feature_id' => $key['product_feature_id'],
          'type_movement' => 1, // 1 for incoming and 2 outbound
          'qty' => $key['output'] * 1,
          'order_item_id' => $key['order_item_id']
        ]);
        return ['ststus' => true];
      } else {
        return ['status' => false, 'msg' => 'product feature not found'];
      }
    } catch (\Throwable $th) {
      //throw $th;
      return ['status' => false, 'msg' => $th->getMessage()];

      return $th->getMessage();
    }
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
      $res = Cutting::with('order_item', 'sales_order')->find($id);
      return response()->json(['data' => $res]);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
  }
}
