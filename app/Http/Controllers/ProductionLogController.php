<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facility\Facility;
use App\Models\Facility\ProductionLog;

class ProductionLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $param = $request->all();
      $facility = $request->query('facility');
      $monthYear = $request->query('monthYear');
      
      try {
          //code...

        if(empty($monthYear)){
          $monthYear = date('Y-m');
        }

        $monthYear = date_create($monthYear);
        $month = date_format($monthYear, 'm');
        $year = date_format($monthYear, 'Y');
    
        if(isset($facility)){
            $query = new ProductionLog();
            $query = $query
                    ->whereYear('date', $year)
                    ->whereMonth('date', $month)
                    ->where('facility_id', $facility)
                    ->get();
        } else {
            $query = new ProductionLog();
            $query = $query
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->get();
        }
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json(['success' => false, 'error' => $th->getMessage()]);
      }

      return response()->json(['data' => $query]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            ProductionLog::create([
                'facility_id' => $param['facility_id'],
                'date' => $param['date'],
                'log' => $param['log']
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $facility = $request->query('facility');
        
        try {
            $query = ProductionLog::where('facility_id', $id)->get();

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'data' => $query
        ]);        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function edit(X $x)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $param = $request->all()['payload'];

        try {
            ProductionLog::find($id)->update($param);

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        try {
            ProductionLog::find($id)->destory();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
