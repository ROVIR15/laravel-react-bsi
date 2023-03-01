<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Monitoring\Sewing;
use App\Models\Facility\Facility;
use App\Models\Order\SalesOrder;
use App\Models\Party\Party;
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
          $query = Sewing::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, facility_id, qty_loading, output')
                  // ->groupBy('line', 'date', 'po_number', 'sales_order_id')
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

    /**
     * Display of a listing of facility capacity in factory
     * 
     */

    public function indexV2(Request $request)
    {
      $monthYear = $request->query('monthYear');

      if(empty($monthYear)) {
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      try {
        //code...
        // $query = Facility::where('facility_type_id', 7)
        //         ->with(['plans' => function($query) use ($month, $year)
        //           {
        //             $query
        //               ->whereHas('man_plan', function($query) use ($month, $year){
        //                 $query
        //                 ->where('month', $month)
        //                 ->where('year', $year);  
        //               })
        //               ->with(['find_realisation_of_sewing' => function($query) use ($month, $year){
        //                 $query
        //                 ->select('id', 'date', 'facility_id', 'sales_order_id', DB::raw('sum(output) as total_output, max(date) as end_date, min(date) as start_date'))
        //                 ->with('sales_order')
        //                 ->whereMonth('date', $month)
        //                 ->whereYear('date', $year)  
        //                 ->groupBy('facility_id','sales_order_id', 'order_id');
        //               }])
        //               // ->with(['sewing' => function($query) use ($month, $year){
        //               //   return $query
        //               //   ->select('id', 'date', 'facility_id', 'sales_order_id', DB::raw('sum(output) as total_output'))
        //               //   ->whereMonth('date', $month)
        //               //   ->whereYear('date', $year)  
        //               //   ->groupBy('facility_id');
        //               // }])
        //               // ->with(['sewing' => function ($query)  use ($month, $year){
        //               //   return $query
        //               //   ->select('id', 'sales_order_id', 'date', DB::raw('sum(output) as total_output'))
        //               //   ->whereMonth('date', $month)
        //               //   ->whereYear('date', $year);    
        //               // }])
        //               ;
        //           }
        //         ])
        //         ->with(['items' => function($query) use ($month, $year){
        //           $query
        //           ->whereHas('man_plan', function($query) use ($month, $year){
        //             $query
        //             ->where('month', $month)
        //             ->where('year', $year);  
        //           });
        //         }])
        //         ->get();

                $query_alt = Facility::where('facility_type_id', 7)
                ->with(['result_sewing' => function($query) use ($month, $year){
                  return $query
                  ->select('id', 'date', 'facility_id', 'sales_order_id', DB::raw('sum(output) as total_output, max(date) as end_date, min(date) as start_date'))
                  ->with('sales_order')
                  ->whereMonth('date', $month)
                  ->whereYear('date', $year)  
                  ->groupBy('facility_id','sales_order_id', 'order_id');
                  // ->select('monitoring_bsi_sewing.id', 'monitoring_bsi_sewing.date', 'monitoring_bsi_sewing.facility_id', 'monitoring_bsi_sewing.sales_order_id', 'monitoring_bsi_sewing.order_id', 
                  //   DB::raw('manufacture_planning_items.expected_output, manufacture_planning_items.work_days, manufacture_planning.id as man_plan_id, manufacture_planning.month, manufacture_planning.year, sum(monitoring_bsi_sewing.output) as total_output'))
                  // ->whereMonth('monitoring_bsi_sewing.date', $month)
                  // ->whereYear('monitoring_bsi_sewing.date', $year)
                  // ->where('manufacture_planning.month', $month)
                  // ->where('manufacture_planning.year', $year)
                  // ->join('manufacture_planning_items', function($join) use ($month, $year){
                  //   $join->on('manufacture_planning_items.sales_order_id', '=', 'monitoring_bsi_sewing.sales_order_id')
                  //         ->orOn('manufacture_planning_items.facility_id', '=', 'monitoring_bsi_sewing.facility_id')
                  //         ->join('manufacture_planning', 'manufacture_planning.id', '=', 'manufacture_planning_items.manufacture_planning_id');
                  // })
                  // ->groupBy('monitoring_bsi_sewing.facility_id', 'monitoring_bsi_sewing.sales_order_id', 'monitoring_bsi_sewing.order_id');
                }])
                ->with(['items' => function ($query) use ($month, $year){
                  return $query
                    ->select('id', 'sales_order_id', 'facility_id', 'expected_output', 'work_days')
                    ->whereHas('month_archive', function($query) use ($month, $year){
                      return $query->where('month', $month)->where('year', $year);
                    });
                }])
                ->get();

      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        'data' => $query_alt
      ]);
    }

      /**
     * Display of a listing of facility capacity in factory
     * 
     */

    public function indexV3(Request $request)
    {
      //get the param of month year parameter
      $monthYear = $request->query('monthYear');

      //check if month year paramaeter is defined
      if(empty($monthYear)) {
        //if empty so create current time
        $monthYear = date('Y-m');
      }

      //transform to unixdate format
      $monthYear = date_create($monthYear);

      //get the month of the parameter
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      try {
        //gert buyer order on working;
        // $query = Sewing::select('id', 'order_id', 'sales_order_id')
        //           ->with('buyer')
        //           ->groupBy('order_id', 'sales_order_id')
        //           ->whereMonth('date', $month)
        //           ->whereYear('date', $year)
        //           ->get();

        //get unique order group by sold_to
        $query2 = SalesOrder::with('party')
                   ->whereHas('monitoring_sewing_detail', function ($query) use ($month, $year){
                     return $query->whereMonth('date', $month)
                                  ->whereYear('date', $year);
                   })
                   ->groupBy('sold_to')
                   ->get();

        //alternative 2
        $query_alt = Party::with(['sales_order' => function ($query) use ($month, $year) {
                        return $query->with(['sewing_output' => function ($query) use ($month, $year) {
                          return $query
                                  ->select('id', 'date', 'order_id', 'sales_order_id', DB::raw('sum(output) as output'))
                                  ->whereMonth('date', $month)->whereYear('date', $year)
                                  ->groupBy('order_id', 'sales_order_id');
                        }])
                        ->with(['sewing_output2' => function ($query) use ($month, $year) {
                          return $query
                                  ->select('id', 'date', 'order_id', 'sales_order_id', DB::raw('sum(output) as output'))
                                  ->groupBy('order_id', 'sales_order_id');
                        }])
                        ->with('order_item', 'avg_price')
                        ->whereHas('sewing_output', function ($query) use ($month, $year){
                          return $query
                                  ->whereMonth('date', $month)
                                  ->whereYear('date', $year);
                        });
                      }])
                      ->whereHas('sales_order', function ($query) use ($month, $year){
                        return $query->whereHas('sewing_output', function ($query) use ($month, $year){
                          return $query
                                  ->whereMonth('date', $month)
                                  ->whereYear('date', $year);
                        });
                      })
                      ->get();

        //get output sewing of selected buyer
        // $query2 = Sewing::select('id', 'order_id', 'sales_order_id', DB::raw('sum(output) as total_output'))
        //            ->with('sum')
        //            ->groupBy('order_id', 'sales_order_id')
        //            ->whereIn('order_id', $buyer_list_based_order);

      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        'data' => $query_alt
      ]);
    }

}
