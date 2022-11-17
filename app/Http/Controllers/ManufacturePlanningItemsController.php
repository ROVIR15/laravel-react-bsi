<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\ManufacturePlanningItems;
use App\Models\Manufacture\BOM;

class ManufacturePlanningItemsController extends Controller
{
    
    public function getCosting(){
      try {
        //code...
        $query = BOM::whereHas('status', function($query3){
          $query3->whereIn('status_type', ['Approve', 'Review']);
        })
        ->get();
        return response()->json($query);
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json($th);
      }
    }

    public function getACosting($id){
      try {
        //code...
        $query = BOM::find($id);
        return response()->json([
          'success' => true,
          'data' => [
            'id' => $query->id,
            'name' => $query->name
          ]
        ]);
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false
        ]);
      }
    }


    //
    public function store(Request $request)
    {
      $param = $request->all()['payload'];

      try {
          ManufacturePlanningItems::create([
            'facility_id' => $param['facility_id'],
            'bom_id' => $param['costing_id'],
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
            ManufacturePlanningItems::find($id)->update($payload);
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
        ManufacturePlanningItems::find($id)->delete();
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
