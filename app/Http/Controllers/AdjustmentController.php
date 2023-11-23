<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory\Adjustment;
use App\Models\Inventory\AdjustmentItem;

class AdjustmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // try {
        //     $query = Adjustment::with('facility', 'user')
        //              ->get();

        //              return response()->json([
        //                 'success' => true,
        //                 'data' => $query
        //             ]);
            
        // } catch (\Throwable $th) {
        //     //throw $th;
        //     return response()-json([
        //         'success' => false,
        //         'error' => $th->getMessage()
        //     ], 500);
        // }

        $query = Adjustment::with('facility', 'user')
        ->get();

        return response()->json([
           'success' => true,
           'data' => $query
       ]);

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
            $_main = Adjustment::create([
                'user_id' => $param['user_id'],
                'facility_id' => $param['facility_id'],
                'change_type' => $param['adjustment_type'],
                'date' => $param['adjustment_date']
            ]);

            $_data = [];
            foreach ($param['items'] as $key) {
                array_push($_data, [
                    'adjustment_id' => $_main['id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'initial_qty' => $key['current_qty'],
                    'changes' => $key['counted_qty']
                ]);
            }

            AdjustmentItem::insert($_data);

        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ]);
    }

        /**
     * Show a resource
     * 
     * @param Interger $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $query = Adjustment::where('id', $id)
                     ->with(['items' => function($query){
                        return $query->with('product', 'product_feature');
                     }])
                    //  ->with('status')
                     ->get();
            
            $results = [];
            foreach ($item as $query) {
                # code...
                $result = [
                    ''
                ]

            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()-json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query[0]
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
        $param = $request->all()['payload'];

        try {
            Adjustment::update($param)->where('$id');
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
        $param = $request->all()['payload'];

        try {
            Adjustment::find($id)->destroy();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'successs' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

}
