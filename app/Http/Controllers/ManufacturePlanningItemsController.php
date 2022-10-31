<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\ManufacturePlanningItems;

class ManufacturePlanningItemsController extends Controller
{
    //
    public function store(Request $request)
    {
      $param = $request->all()['payload'];

      try {
          ManufacturePlanningItems::create([
            'manufacture_planning_id' => $param['manufacture_planning_id'],
            'sales_order_id' => $param['sales_order_id'],
            'expected_output' => $param['expected_output'],
            'work_days' => $param['work_days']    
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $payload = $request->all()['payload'];

        try {
            ManufacturePlanningItems::update($payload)->find($id);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
              'success' => false,
              'error' => $th->getMessage()
            ], 200);
        }
        return response()->json([
          'success' => true,
        ], 200);        
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
