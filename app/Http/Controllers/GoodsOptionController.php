<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product\Goods;
use App\Models\Product\ProductFeature;
use App\Models\Inventory\Inventory;
use App\Http\Resources\Product\Goods as GoodsOneCollection;
use App\Http\Resources\Product\GoodsCollection;
use App\Http\Resources\Product\ProductFeature as ProductFeatureOneCollection;
use App\Http\Resources\Product\ProductFeatureCollection;

class GoodsOptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $param = $request->all();
        $item = Inventory::get('product_feature_id');
        $query = ProductFeature::whereNotIn('id', $item)->get();

        // return new GoodsReceiptCollection($query);
        return response()->json([
            'success' => true,
            'data' => new ProductFeatureCollection($query)
        ]);
    }
}
