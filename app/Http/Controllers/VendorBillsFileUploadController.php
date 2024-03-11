<?php

namespace App\Http\Controllers;

use App\Models\Invoice\Invoice;
use App\Models\Invoice\VendorBillFileUpload;
use Illuminate\Http\Request;

class VendorBillsFileUploadController extends Controller
{
    //
    public function update($id, Request $request)
    {
        $param = $request->all()['payload'];
        try {
            $query = VendorBillFileUpload::where('invoice_id', $id)->first();

            if (is_null($query)){
                $inv = Invoice::find($id);

                VendorBillFileUpload::create([
                    'tanggal_inv' => $param['tanggal_inv'],
                    'nomor_inv' => $param['nomor_inv'],
                    'invoice_id' => $inv['id'],
                    'url' => $param['url']
                ]);
            } else {
                VendorBillFileUpload::where('invoice_id', $id)->update($param);
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
