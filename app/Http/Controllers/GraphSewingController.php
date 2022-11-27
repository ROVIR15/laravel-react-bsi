<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Order\OrderItem;
use Illuminate\Http\Request;
use App\Models\Monitoring\Sewing; 
use App\Models\Manufacture\ManufacturePlanning;
use App\Models\Manufacture\ManufacturePlanningItems;

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

    // Work Detail
    public function testingAPI1(Request $request){
      $monthYear = $request->query('monthYear');
      $facility = $request->query('facility');
      
      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      try {
        $sewing = Sewing::with('sales_order', 'order_item')
        ->where('facility_id', $facility)
        ->whereYear('date', '=', $year)
        ->whereMonth('date', '=', $month)
        ->orderBy('date', 'asc')
        ->get();
        
      } catch(Throwable $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        // 'date' => $date,
        'data' => $sewing,
      ]);
    }

    // Per Order
    public function testingAPI2(Request $request){
      $monthYear = $request->query('monthYear');
      $facility = $request->query('facility');
      $sales_order_id = $request->query('sales_order_id');

      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      try {
        $mp = ManufacturePlanning::with(['test_sum_based_on_mpi' => function($query) use ($facility){
          $query->with(['ckckck' => function($query2) use ($facility){
            $query2->where('facility_id', $facility);
          }])
          ->where('facility_id', $facility);
        }])
        ->where('year', '=', $year)
        ->where('month', '=', $month)
        ->get();

      } catch(Throwable $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        'data' => $mp
      ]);
    }

    // 
    public function testingAPI3($id, Request $request){
      $monthYear = $request->query('monthYear');
      $facility = $request->query('facility');
      $sales_order_id = $request->query('sales_order_id');

      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      try {
        $mp = ManufacturePlanningItems::with(['sewing' => function($query) use ($year, $month, $facility, $sales_order_id){
          $query
          ->select('date', 'sales_order_id', 'facility_id', DB::raw('sum(output) as total_output'))
          ->where('facility_id', $facility)
          ->where('sales_order_id', $sales_order_id)
          ->whereYear('date', $year)
          ->whereMonth('date', $month)
          ->groupBy('date');
        }])
        ->with('bom')
        ->find($id);

      } catch(Exception $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        'data' => $mp
      ]);
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
        $amount = Sewing::select('id', 'order_item_id', 'order_id', 'sales_order_id', 'product_feature_id', 'date', DB::raw('sum(output) as total_output'))
                  ->with('order_item')
                  ->groupBy('order_item_id')
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->orderBy('date', 'asc')
                  ->get();

        $qty_get = Sewing::select(DB::raw('sum(output) as total_output'))
                    ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                    ->get();

        $month = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $month = date_format($month, 'm');
        
        $planning = ManufacturePlanning::with(['items_with_price' => function($query) use ($fromDate, $thruDate){
                      $query->with(['ckck' => function($query2) use ($fromDate, $thruDate){
                        $query2->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate]);
                      }]);
                    }])
                  ->where('month', intval($month))
                  ->orderBy('id', 'asc')->get();
        
        $total_garment_made = Sewing::select(DB::raw('sum(output) as total_output'))
                  ->whereMonth('date', 10)
                  ->get();

        $group_of_order_id = Sewing::select('id', 'order_id')
        ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
        ->groupBy('order_id')
        ->get();

        $list_of_sewing = Sewing::with('order_item')
        ->whereMonth('date', 10)
        ->get();

      } catch (Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        'qty' => $qty_get[0],
        'data' => $amount,
        'planning' => $planning,
        // 'total_garment_made' => $total_garment_made,
        // 'list_order' => count($group_of_order_id),
        // 'list_of_sewing' => $list_of_sewing
      ]);
    }
}
