<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\BOMItem_alt;

class BOMItem_AltController extends Controller
{
    /**
     * Store a newly created resource in storage
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $param = $request->all()['payload'];

        try {
            BOMItem_alt::create([
                'bom_id' => $param['bom_id'],
                'product_feature_id' => $param['product_feature_id'],
                'consumption' => $param['consumption'],
                'allowance' => $param['allowance'],
                'unit_price' => $param['unit_price']
            ]);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }

    /**
     * Update data of a resource
     * 
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

     public function update($id, Request $request)
     {
         $param = $request->all()['payload'];

         try {
             BOMItem_alt::find($id)->update($param);
         } catch (\Throwable $th) {
             //throw $th;
             return response()->json([
                 'successs' => false,
                 'error' => $th->getMessage()
             ], 500);
         }

         return response()->json([
            'success' => true
         ]);
     }

    /**
     * Delete a data from rows
     * 
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            BOMItem_alt::find($id)->delete();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }
}
