<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Order\OrderItem;
use Illuminate\Http\Request;
use App\Models\Monitoring\Sewing; 
use App\Models\Manufacture\ManufacturePlanning;

class GraphSewingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');

      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      try {
        //code...
        $query = Sewing::selectRaw('date')
                ->groupBy('date')
                ->orderBy('date')
                ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                ->get();

        $line = Sewing::selectRaw('line')
                ->groupBy('line')
                ->orderBy('line')
                ->get();
  
        $query2 = Sewing::selectRaw('date, line, sum(qty_loading) as qty_loading, sum(output) as output')
                ->groupBy('date', 'line')
                ->orderBy('line')
                ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                ->get();
  
        $label = [];

        foreach ($query as $key) {
          # code...
          array_push($label, $key['date']);
        }
  
        $lines = [];
  
        foreach ($line as $key) {
          # code...
          array_push($lines, $key['line']);
        }
  
        return response()
                ->json([
          'label' => $label,
          'lines' => $lines,
          'chart' => $query2
        ]);
  
      } catch (Throwable $th) {
        //throw $th;
        return response()
                ->json([
          'success' => false,
          'error' => $th
        ]);
      }

    }

    public function sewingLineDetail(Request $request) {
      $date = $request->query('date');

      if(empty($date)){
        $date = date('Y-m-d');
      }

      try {
        $res = Sewing::select('id', 'sales_order_id', 'order_item_id', 'po_number', 'product_feature_id', 'facility_id', 'date',DB::raw('sum(output) as total_output'))
        ->with( 
        ['product_feature', 'order_item', 'sales_order', 'target' => function($query2) use ($date){
          $query2->where('date', $date);
        }])
        ->groupBy('facility_id', 'date')
        ->where('date', $date)
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

    public function getAmountOfMoney(Request $request)
    {
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');

      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      try {
        //code...
        // $alternative_two = OrderItem
        $amount = Sewing::select('id', 'order_item_id', 'product_feature_id', 'date', DB::raw('sum(output) as total_output'))
                  ->with('order_item')
                  ->groupBy('order_item_id')
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->orderBy('date', 'asc')
                  ->get();

        $month = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $month = date_format($month, 'm');

        $planning = ManufacturePlanning::with('items_with_price')->where('month', intval($month))->orderBy('id', 'asc')->get();

      } catch (Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        'data' => $amount,
        'planning' => $planning,
        'fromDate' => $fromDate,
        'thruDate' => $thruDate
      ]);
    }
}
