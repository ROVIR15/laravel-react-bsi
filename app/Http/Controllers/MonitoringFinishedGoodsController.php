<?php

namespace App\Http\Controllers;

use App\Models\Inventory\GoodsMovement;
use App\Models\Inventory\MaterialTransfer;
use App\Models\Inventory\MaterialTransferItem;
use App\Models\Inventory\MaterialTransferRealisation;
use DB;
use Illuminate\Http\Request;
use App\Models\Monitoring\FinishedGoods;
use App\Models\Product\Product;
use App\Models\Product\ProductFeature;
use Exception;

class MonitoringFinishedGoodsController extends Controller
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
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');
      $query = [];

      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      try {
        //code...
        if($param){
          $query = FinishedGoods::selectRaw('id, date, po_number, box, sales_order_id, product_feature_id, order_id, order_item_id, line, sum(qty_loading) as qty_loading, sum(output) as output')
                  ->groupBy('line', 'date', 'product_feature_id', 'po_number', 'sales_order_id', 'order_id')
                  ->with('sales_order', 'product_feature')
                  ->where('sales_order_id', $request->query('sales-order'))
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->orderBy('date', 'desc')
                  ->get();
        } else {
          $query = FinishedGoods::selectRaw('id, date, po_number, box, sales_order_id, product_feature_id, order_id, order_item_id, line, sum(qty_loading) as qty_loading, sum(output) as output')
                  ->groupBy('line', 'date', 'po_number', 'product_feature_id')
                  ->with('sales_order', 'product_feature')
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->orderBy('date', 'desc')
                  ->get();
        }
      } catch (Throwable $th) {
        //throw $th;
        return response()->json(['data' => $th->getMessage()]);
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
          // return response()->json(['success' => true, 'data' => 'data']);

          FinishedGoods::insert($param['items']);

          $res = $this->putInToStorage($param);

          if(!$res){
            throw new Exception($res);
            return response()->json(['success' => false, 'message' => $res]);
          }
          
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

        return response()->json(['success' => true, 'message' => $res], 200);
      }

    public function putInToStorage($data)
    {
      $param = $data;

      try {
        $to_facility_id = $param['to_facility_id'];
        $from_facility_id = $param['from_facility_id'];
        $date = date("Y-m-d");  

        $prep = [
          'to_facility_id' => $to_facility_id,
          'from_facility_id' => $from_facility_id,
          'est_transfer_date' => $date,
          'user_id' => $param['user_id'],
          'description' => 'Automatically Generated by System'
        ];
  
        $mt = MaterialTransfer::create($prep);
        DB::commit();
  
        foreach ($param['items'] as $key) {

          $product_info = ProductFeature::with('product')->where('id', $key['product_feature_id'])->get();

          if(count($product_info) === 0){
            return response()->json([
              'success' => false,
              'message' => `Error, couldn't find the product`
            ]);
          }

          $product = $product_info[0]['product'];
          $goods = $product ? $product->goods : null;

          $_temp = [
            'material_transfer_id' => $mt['id'],
            'product_id' => $product->id,
            'product_feature_id' => $key['product_feature_id'],
            'order_item_id' => $key['order_item_id'],
            'transfer_qty' => $key['output']
          ];
  
          $mti = MaterialTransferItem::create($_temp);
          DB::commit();
  
          $mtr = MaterialTransferRealisation::create([
            'material_transfer_id' => $mt['id'],
            'material_transfer_item_id' => $mti['id'],
            'transferred_qty' => $key['output']
          ]);
          DB::commit();
  
          //add qty from to_facility_id and make record on goods_movement;
          GoodsMovement::create([
            'date' => $date,
            'material_transfer_id' => $mt['id'],
            'material_transfer_item_id' => $mti['id'],
            'material_transfer_item_realisation_id' => $mtr['id'],
            'facility_id' => $to_facility_id,
            'goods_id' => $goods->id,
            'product_id' => $product->id,
            'product_feature_id' => $key['product_feature_id'],
            'type_movement' => 1, // 1 for incoming and 2 outbound
            'qty' => $key['output'],
            // adding order_item_id
            'order_item_id' => $key['order_item_id'],
          ]);
          DB::commit();
        }
      } catch (\Throwable $th) {
        //throw $th;
        return $th->getMessage();
      }

      return true;
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
        $res = FinishedGoods::with('order_item', 'sales_order')->find($id);
        return response()->json(['data' => $res]);
    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }

    /**
     * Get the valuation from ready-made garment
     * 
     * @param \App\X $X
     * @return \Illuminate\Http\Response
     */

    public function getReadyMadeGarmentValuation(Request $request)
    {
      $monthYear = $request->query('monthYear');

      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      try 
      {

        $query_alt = Product::with('goods')
                      ->with(['check_finished_goods' => function ($query) use ($month, $year) {
                        return $query
                                ->select('date', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output'))
                                ->whereHas('check_shipment', function ($query) use ($month, $year) {
                                  return $query->whereHas('shipment', function($query) use ($month, $year){
                                    return $query
                                            ->whereYear('delivery_date', $year)
                                            ->whereMonth('delivery_date', $month);
                                  });
                                })
                                ->whereMonth('date', $month)
                                ->whereYear('date', $year)
                                ->groupBy('order_item_id');
                      }])
                      ->whereHas('check_finished_goods', function ($query) use ($month, $year){
                        return $query
                                ->whereMonth('date', $month)
                                ->whereYear('date', $year);
                      })
                      ->with(['check_shipment' => function($query) use ($month, $year) {
                        return $query
                                ->whereMonth('date', $month)
                                ->whereYear('date', $year);
                      }])
                      ->get();
        $query = FinishedGoods::select('id', 'date', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output'))
                  ->with(['check_shipment' => function($query) use ($month, $year){
                    return $query->whereHas('shipment', function($query) use ($month, $year){
                      return $query
                              ->whereYear('delivery_date', $year)
                              ->whereMonth('delivery_date', $month);
                    });
                  }])
                  ->with('order_item')
                  ->whereHas('check_shipment', function($query) use ($year, $month)
                  {
                    return $query
                    ->whereHas('shipment', function($query) use ($month, $year){
                      $query
                      ->whereMonth('delivery_date', $month)
                      ->whereYear('delivery_date', $year);
                    })
                    ->whereNotNull('order_item_id');
                  })
                  ->whereYear('date', $year)
                  ->whereMonth('date', $month)
                  ->groupBy('order_item_id')
                  ->get();
      }

      catch (\Throwable $th) 
      {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }
      return response()->json([
        'data' => $query_alt
      ]);
    }
}
