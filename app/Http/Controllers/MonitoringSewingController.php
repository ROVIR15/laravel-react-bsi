<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Monitoring\Sewing;
use DB;

class MonitoringSewingController extends Controller
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
        if($param){
          $query = Sewing::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, sum(qty_loading) as qty_loading, sum(output) as output')
                  ->groupBy('line', 'date', 'po_number', 'sales_order_id', 'product_feature_id', 'order_id')
                  ->with('sales_order', 'product_feature', 'qc')
                  ->where('sales_order_id', $request->query('sales-order'))
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->orderBy('date', 'asc')
                  ->get();
        } else {
          $query = Sewing::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, sum(qty_loading) as qty_loading, sum(output) as output')
                  ->groupBy('line', 'date', 'po_number', 'sales_order_id')
                  ->with('sales_order', 'product_feature', 'qc')
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->orderBy('date', 'asc')
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
            Sewing::insert($param);
            
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
        $res = Sewing::with('order_item', 'sales_order')->find($id);
        return response()->json(['data' => $res]);
    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }

}
