<?php

namespace App\Http\Controllers;

use App\Models\Order\SalesOrder;
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
            $query = POBuyerProof::where('sales_order_id', $id)->first();

            if (is_null($query)){
                $so = SalesOrder::find($id);

                POBuyerProof::create([
                    'tanggal_po' => $param['tanggal_po'],
                    'nomor_po' => $param['nomor_po'],
                    'sales_order_id' => $so['id'],
                    'order_id' => $so['order_id'],
                    'imageUrl' => $param['imageUrl']
                ]);
            } else {
                POBuyerProof::where('sales_order_id', $id)->update($param);
            }

        } catch (Throwable $e) {
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
