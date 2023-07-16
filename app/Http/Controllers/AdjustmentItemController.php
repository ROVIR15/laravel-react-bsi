<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdjustmentItemController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $query = Adjustment::with('items', 'facility')
                     ->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()-json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

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
            $_main = AdjustmentItem::create([                    'adjustment_id' => $_main['id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'initial_qty' => $key['initial_qty'],
                    'changes' => $key['changes']
                ]);

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
            $query = MaterialTransfer::where('id', $id)
                     ->with(['items' => function($query){
                        return $query->with('product', 'product_feature', 'transffered');
                     }])
                     ->with('status')
                     ->get();
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
            AdjustmentItem::update($param)->where('$id');
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
            AdjustmentItem::find($id)->destroy();
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
