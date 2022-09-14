<?php

namespace App\Http\Controllers;

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
      $query = Sewing::selectRaw('date')->groupBy('date')->orderBy('date')->get();

      $line = Sewing::selectRaw('line')->groupBy('line')->orderBy('line')->get();

      $query2 = Sewing::selectRaw('date, line, sum(qty_loading) as qty_loading, sum(output) as output')->groupBy('date', 'line')->orderBy('line')->get();

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

      return response()->json([
        'label' => $label,
        'lines' => $lines,
        'chart' => $query2
      ]);
    }
}
