<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\Monitoring\Cutting;

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

      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      try {
        if($param){
          $query = Cutting::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, sum(output) as output')
                  ->groupBy('po_number', 'sales_order_id', 'order_item_id')
                  ->with('sales_order', 'product_feature')
                  ->with(['sewing' => function ($query) use ($order_id){
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

    public function getCuttingSupermarket(Request $request)
    {
      $param = $request->has('sales-order');
      $order_id = $request->query('sales-order');
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');
      $query = [];

      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      try {
        if($param){
          $query = Cutting::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, sum(output) as output')
                  ->groupBy('po_number', 'sales_order_id', 'order_item_id')
                  ->with('sales_order', 'product_feature')
                  ->with(['supermarket' => function ($query) use ($order_id){
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
