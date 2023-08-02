<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\Monitoring\FinishedGoods;
use App\Models\Product\Product;

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
          FinishedGoods::insert($param);
          
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
