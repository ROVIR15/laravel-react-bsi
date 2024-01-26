<?php

namespace App\Http\Controllers;

use App\Models\Manufacture\BOM;
use Illuminate\Http\Request;
use App\Models\Manufacture\BOM_alt;
use App\Models\Manufacture\BOMItem_alt;

class BOM_AltController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $query = BOM_alt::with('items', 'product_feature')->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }
    

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
            $bom_alt = BOM_Alt::create([
                'product_feature_id' => $param['product_feature_id']
            ]);

            $item_alt = [];
            foreach ($param['items'] as $key) {
                # code...
                array_push($item_alt, [
                    'bom_id' => $bom_alt['id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'consumption' => $key['consumption'],
                    'allowance' => $key['allowance'],
                    'unit_price' => $key['unit_price']
                ]);
            }

            BOMItem_alt::insert($item_alt);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 500);
    }
    
    /**
     * Display a resource 
     * 
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $query = BOM_alt::where('id', $id)->with('items', 'product_feature')->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }

    public function showBOMBasedCosting($id)
    {
        try {
            $query = BOM::with('items', 'product')->find($id);

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }


    /**
     * Get BoM item alt resources based on bom_id
     * 
     * @param $bom_id
     * @return \Illuminate\Http\Response
     * 
     */
    public function getBOMItem_alt($bom_id)
    {    
        try {
            $query = BOMItem_alt::where('bom_id', $bom_id)->get();

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
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
            BOM_alt::find($id)->delete();
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
