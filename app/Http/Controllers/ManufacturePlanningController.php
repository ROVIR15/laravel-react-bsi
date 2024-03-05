<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\ManufacturePlanning;
use App\Models\Manufacture\ManufacturePlanningItems;
use DateTime;
use DB;

class ManufacturePlanningController extends Controller
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
        $query = ManufacturePlanning::with('items_with_price')
                  ->orderBy('id', 'desc')
                  ->get();

        return response()->json($query);
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

      DB::beginTransaction();

      try {

        $plan = ManufacturePlanning::create([
          'month' => $param['month'],
          'year' => $param['year']
        ]);

        if(!$plan['id']) {
            throw new Exception("Error Processing Request", 1); 
        }
        
        $list = [];

        foreach ($param['items'] as $key) {

            $_start_date = new DateTime($key['line_start_date']);
            $_end_date = new DateTime($key['line_end_date']);
            array_push($list, [
                'facility_id' => $key['facility_id'],
                'bom_id' => $key['costing_id'],
                'manufacture_planning_id' => $plan['id'],
                'sales_order_id' => $key['sales_order_id'],
                'number_of_machines' => $key['number_of_machines'],
                'line_start_date' => $_start_date,
                'line_end_date' => $_end_date,
                'anticipated_pcs_per_line_output' => $key['anticipated_pcs_per_line_output'],
                'expected_output' => $key['expected_total_output'],
                'work_days' => $key['work_days']    
            ]);
        }

        ManufacturePlanningItems::insert($list);

        DB::commit();

      } catch (Exception $e) {

        DB::rollback();
        //throw $th;
        return response()->json(
          [
            'success' => false,
            'errors' => $e->getMessage()
          ],
          500
        );
      }
      
      return response()->json([
        'success' => true
      ], 200);
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
        $query = ManufacturePlanning::with('items_with_price')->find($id);
        return response()->json($query);
        // return new ManufactureOneCollection($query[0]);
    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
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

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        ManufacturePlanning::destroy($id);
        return response()->json([
          'success' => true,
        ], 200);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    } 
}
