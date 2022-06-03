<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory\InventoryItem;
use App\Http\Resources\Inventory\Inventory;
use App\Http\Resources\Inventory\InventoryItemCollection;

class ConsumeInventoryController extends Controller
{
    //
    public function store(Request $request) {
        $param = $request->all()['payload'];

        try {
            //code...
            $result =  (array) [];
            foreach ($param as $key) {
                # code...
                array_push($result, $key['product_feature_id']);
            };

            $query = InventoryItem::whereIn('product_feature_id', $result)->get();

            // return response()->json($query);
            return new InventoryItemCollection($query);
            
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }
    }

    public function show($product_feature_id) {

        try {
            //code...
            $query = InventoryItem::where('product_feature_id', $product_feature_id)->first();

            return response()->json([
                'data' => $query
            ]);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }
    }
}
