<?php

namespace App\Http\Controllers;

use App\Models\Order\POBuyerProof;
use Illuminate\Http\Request;

class POBuyerProofController extends Controller
{
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
            POBuyerProof::where('sales_order_id', $id)->update($param);
        } catch (Exception $e) {
            //throw $th;
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }
}
