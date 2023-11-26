<?php

namespace App\Http\Controllers;


use Exception;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Product\Goods;
use App\Models\Product\Product;
use App\Models\Inventory\Inventory;
use App\Models\Product\ProductFeature;
use App\Models\Product\ProductHasCategory;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\GoodsCollection;
use App\Http\Resources\Product\Goods as GoodsOneCollection;
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
            if(is_null($goods)){
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
      "success" => true,
      "data" => array_values($hha)
    ]);
  }

  public function showFabric()
  {
    try {
      //code...
      $query = ProductHasCategory::where('product_category_id', 3)->with('product', 'category')->get();
    } catch (Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $query
    ]);
  }

  public function showFG()
  {
    try {
      //code...
      $query = ProductHasCategory::where('product_category_id', 1)->with('product', 'category')->get();
    } catch (Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $query
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $goodsParam = $request->all()['payload']['goods'];
    $catParam = $request->all()['payload']['category'];
    $feature_size = $request->all()['payload']['feature_one'];
    $feature_color = $request->all()['payload']['feature_two'];

    try {
      $goods = Goods::create([
        'name' => $goodsParam['name'],
        'satuan' => $goodsParam['unit'],
        'value' => $goodsParam['value'],
        'brand' => $goodsParam['brand'],
        'imageUrl' => $goodsParam['imageUrl']
      ]);

      $product = Product::create([
        'goods_id' => $goods['id'],
      ]);

      $productHasCategory = ProductHasCategory::create([
        'product_id' => $product['id'],
        'product_category_id' => $catParam
      ]);

      $items = [];
      $inventory_items = [];

      foreach ($feature_size as $key) {
        # code...
        foreach ($feature_color as $key2) {
          # code...
          $temp = [
            'product_id' => $product['id'],
            'color' => $key2,
            'size' => $key
          ];

          array_push($items, $temp);

          $facility_cat;
          switch ($catParam) {
            case 1:
              # code...
              $facility_cat = 1;
              break;

            case 2:
              # code...
              $facility_cat = 2;
              break;

            case 3:
              # code...
              $facility_cat = 3;
              break;

            default:
              # code...
              $facility_cat = 6;
              break;
          }

          // $inventory = [
          //   'facility_id' => $facility_cat,
          //   'product_feature_id' => $id,
          //   'qty_on_hand' => 0
          // ];

          // array_push($inventory_items, $inventory);
        }
      }

      ProductFeature::insert($items);
      // Inventory::insert($inventory_items);

    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
    return response()->json([
      'success' => true,
      'items' => $items
    ], 200);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function show($id, Goods $goods, Product $product)
  {
    try {
      // $query = ProductHasCategory::whereNotIn('product_category_id', [7,8,9])->with('product', 'category')->get();
      $tes = $product->where('id', $id)->get();

      if(!isset($tes[0])){
        return response()->json([
          'success' => false,
          'message' => 'Not found!'
        ], 404);
      }

      $goods = $goods->find($tes[0]['goods_id']);

      return new GoodsOneCollection($goods);
      // return response()->json($feature);
    } catch (Exception $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function edit(X $x)
  {
    //
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
    $goodsParam = $request->all()['payload']['goods'];
    $catParam = $request->all()['payload']['category'];
    try {
      $existingProduct = Product::find($id);

      Goods::find($id)->update([
        'name' => $goodsParam['name'],
        'satuan' => $goodsParam['unit'],
        'value' => $goodsParam['value'],
        'brand' => $goodsParam['brand'],
        'imageUrl' => $goodsParam['imageUrl']
      ]);

      $_goods = Product::where('goods_id', $id)->get();

      if (sizeof($_goods) === 0) {
        return response()->json(sizeOf($_goods));
        throw new Exception("Goods Not Found", 1);
      }

      ProductHasCategory::where('product_id', $_goods[0]['id'])
        ->update([
          'product_category_id' => $catParam
        ]);
    } catch (Exception $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
    return response()->json([
      'success' => true,
    ], 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    try {
      $existingGoods = Goods::find($id);

      //Delete Goods
      $existingGoods->delete();
    } catch (Exception $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
    return response()->json([
      'success' => true
    ], 200);
  }
}
