<?php

namespace App\Http\Controllers;

use App\Models\KITE\ImportDocItem;
use Illuminate\Http\Request;

class KITEImportController extends Controller
{
    //
    public function update($id, Request $request)
    {
        $param = $request->all()['payload'];

        try {
            //code...
            ImportDocItem::find($id)->update($param);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
            ]);
        }
        return response()->json([
            'success' => true
        ]);
    }
}
