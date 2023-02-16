<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\Monitoring\FinishedGoods;

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
}
