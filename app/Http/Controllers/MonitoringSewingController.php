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
          $query = Sewing::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, facility_id, sum(qty_loading) as qty_loading, sum(output) as output')
                  ->with('sales_order', 'product_feature')
                  ->with(['qc' => function ($query) use ($order_id){
                    return $query->where('order_id', $order_id);
                  }])
                  ->where('order_id', $request->query('sales-order'))
                  ->groupBy('order_item_id')
                  ->get();
        } else {
          $query = Sewing::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, facility_id, sum(qty_loading) as qty_loading, sum(output) as output')
                  ->groupBy('line', 'date', 'po_number', 'sales_order_id')
                  ->with('sales_order', 'product_feature', 'qc')
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->orderBy('date', 'desc')
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
    public function show($facilityId)
    {
      try {
        $res = Sewing::select('id', 'sales_order_id', 'po_number', 'product_feature_id', 'facility_id', 'date',DB::raw('sum(output) as total_output'))
              ->with('product_feature', 'sales_order', 'target')
              ->where('facility_id', $facilityId)
              ->groupBy('facility_id', 'date')
              ->orderBy('date', 'desc')
              ->get();
        return response()->json(['data' => $res]);
    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }

}
