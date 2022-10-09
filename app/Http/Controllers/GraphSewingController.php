<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\Monitoring\Sewing; 

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
}
