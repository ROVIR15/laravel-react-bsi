<?php

namespace App\Http\Controllers\V2;

use App\Models\Product\ProductHasCategory;
use App\Http\Controllers\Controller;
use Throwable;

class GoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $query = ProductHasCategory::whereNotIn('product_category_id', [7, 8, 9])
                ->with('product', 'category')
                ->get()
                ->map(function ($item) {

                    $product = $item->product ? $item->product : null;
                    $category = $item->category ? $item->category : null;
                    $goods = !is_null($product) ? $product->goods : null;

                    if (is_null($product)) {
                        if (is_null($category)) {
                            return [
                                'id' => NULL,
                                'goods_id' => NULL,
                                'name' => 'Unknown',
                                'unit_measurement' => 'Unknown',
                                'value' => 'Unknown',
                                'imageUrl' => 'Unknown',
                                'category_id' => NULL,
                                'category_sub_id' => NULL,
                                'category_name' => 'Unknown'
                            ];
                        }
                    } else {
                        if (is_null($goods)) {
                            if (is_null($category)) {
                                return [
                                    'id' => $product->id,
                                    'goods_id' => NULL,
                                    'name' => 'Unknown',
                                    'unit_measurement' => 'Unknown',
                                    'value' => 'Unknown',
                                    'imageUrl' => 'Unknown',
                                    'category_id' => NULL,
                                    'category_sub_id' => NULL,
                                    'category_name' => 'Unknown'
                                ];
                            } else {
                                return [
                                    'id' => $product->id,
                                    'goods_id' => NULL,
                                    'name' => 'Unknown',
                                    'unit_measurement' => 'Unknown',
                                    'value' => 'Unknown',
                                    'imageUrl' => 'Unknown',
                                    'category_id' => $category->id,
                                    'category_sub_id' => $category->sub->id,
                                    'category_name' => $category->name . ' ' . $category->sub->name
                                ];
                            }
                        } else {
                            if (is_null($category)) {
                                return [
                                    'id' => $product->id,
                                    'goods_id' => $product->goods_id,
                                    'name' => $goods->name,
                                    'unit_measurement' => $goods->satuan,
                                    'value' => $goods->value,
                                    'imageUrl' => $goods->imageUrl,
                                    'category_id' => NULL,
                                    'category_sub_id' => NULL,
                                    'category_name' => NULL
                                ];
                            } else {
                                $category_id = str_pad($category->id, 2, '0', STR_PAD_LEFT);
                                $category_sub_id = str_pad($category->sub->id, 2, '0', STR_PAD_LEFT);
                                $product_id = str_pad($product->id, 4, '0', STR_PAD_LEFT);
                                $goods_id = str_pad($goods->id, 4, '0', STR_PAD_LEFT);
                                // $sku_id = $category_id.$category_sub_id.$product_id.$goods_id;
                                $sku_id = $goods_id.'-'.$product_id;
                                return [
                                    'sku_id' => $sku_id,
                                    'id' => $product->id,
                                    'goods_id' => $product->goods_id,
                                    'name' => $goods->name,
                                    'unit_measurement' => $goods->satuan,
                                    'value' => $goods->value,
                                    'imageUrl' => $goods->imageUrl,
                                    'category_id' => $category->id,
                                    'category_sub_id' => $category->sub->id,
                                    'category_name' => $category->name . ' ' . $category->sub->name
                                ];
                            }
                        }
                    }
                });

            $array = $query->toArray();

            $hha =  array_filter($array, function ($item) {
                return !is_null($item['goods_id']);
            });
        } catch (Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            "success" => true,
            "data" => array_values($hha)
        ]);
    }

    public function showFabric()
    {
        try {
            //code...
            $query = ProductHasCategory::where('product_category_id', 3)
                ->with('product', 'category')
                ->get()
                ->map(function ($item) {

                    $product = $item->product ? $item->product : null;
                    $category = $item->category ? $item->category : null;
                    $goods = !is_null($product) ? $product->goods : null;

                    if (is_null($product)) {
                        if (is_null($category)) {
                            return [
                                'id' => NULL,
                                'goods_id' => NULL,
                                'name' => 'Unknown',
                                'unit_measurement' => 'Unknown',
                                'value' => 'Unknown',
                                'imageUrl' => 'Unknown',
                                'category_id' => NULL,
                                'category_sub_id' => NULL,
                                'category_name' => 'Unknown'
                            ];
                        }
                    } else {
                        if (is_null($goods)) {
                            if (is_null($category)) {
                                return [
                                    'id' => $product->id,
                                    'goods_id' => NULL,
                                    'name' => 'Unknown',
                                    'unit_measurement' => 'Unknown',
                                    'value' => 'Unknown',
                                    'imageUrl' => 'Unknown',
                                    'category_id' => NULL,
                                    'category_sub_id' => NULL,
                                    'category_name' => 'Unknown'
                                ];
                            } else {
                                return [
                                    'id' => $product->id,
                                    'goods_id' => NULL,
                                    'name' => 'Unknown',
                                    'unit_measurement' => 'Unknown',
                                    'value' => 'Unknown',
                                    'imageUrl' => 'Unknown',
                                    'category_id' => $category->id,
                                    'category_sub_id' => $category->sub->id,
                                    'category_name' => $category->name . ' ' . $category->sub->name
                                ];
                            }
                        } else {
                            if (is_null($category)) {
                                return [
                                    'id' => $product->id,
                                    'goods_id' => $product->goods_id,
                                    'name' => $goods->name,
                                    'unit_measurement' => $goods->unit_measurement,
                                    'value' => $goods->value,
                                    'imageUrl' => $goods->imageUrl,
                                    'category_id' => NULL,
                                    'category_sub_id' => NULL,
                                    'category_name' => NULL
                                ];
                            } else {
                                return [
                                    'id' => $product->id,
                                    'goods_id' => $product->goods_id,
                                    'name' => $goods->name,
                                    'unit_measurement' => $goods->unit_measurement,
                                    'value' => $goods->value,
                                    'imageUrl' => $goods->imageUrl,
                                    'category_id' => $category->id,
                                    'category_sub_id' => $category->sub->id,
                                    'category_name' => $category->name . ' ' . $category->sub->name
                                ];
                            }
                        }
                    }
                });

            $array = $query->toArray();

            $hha =  array_filter($array, function ($item) {
                return !is_null($item['goods_id']);
            });
        } catch (Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => array_values($hha)
        ]);
    }
}
