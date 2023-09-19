<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use App\Models\Product\ProductFeature;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductFeatureCollection;

class ProductFeatureController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $query = ProductFeature::with('product', 'product_category')->get();

    return response()->json([
      'data' => $query
    ]);
  }

  /**
   * Display resourcec of product feature include information of stock tranfer
   * 
   * @param 
   * @return \Illuminate\Http\Response
   */
  public function checkInventoryItemWithStock()
  {

    try {
      $query = ProductFeature::with('product', 'product_category', 'stock_in', 'stock_shipped_out', 'stock_transfer_out')->get();
    } catch (\Throwable $th) {
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

  public function justFinishedGoods()
  {
    try {
      $query = ProductFeature::whereHas('product_category', function ($query) {
        return $query->where('product_category_id', 1);
      })->with('product', 'product_category')
        ->get()
        ->map(function ($query) {
          $product = $query->product ? $query->product : null;
          $goods = $product ? $product->goods : null;

          // $query3 = BOMItem::select('unit_price', 'id as costing_item_id')->where('bom_id', $costing_id)->where('product_id', $query->product_id)->get();
          return
              [
                  'id' => $query['id'],
                  'product_id' => $query['product_id'],
                  'product_feature_id' => $query['id'],
                  'item_name' => $goods ? $goods->name . ' - ' . $query->color . ' ' . $query->size : null,
                  'unit_measurement' => $goods ? $goods->satuan : null,
                  'brand' => $goods ? $goods->brand : null,
                  'category_id' => $query->product_category->product_category_id,
                  'category_name' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                  'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                  'unit_price' => 0,
                  'costing_item_id' => NULL
              ];
      });
    } catch (\Throwable $th) {
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
   * Display Fabric Type Material
   */
  public function showFabric()
  {
    try {
      //code...
      $query = ProductFeature::whereHas('product_category', function ($query) {
        $query->where('product_category_id', 4);
      })->with('product', 'product_category')->get();
    } catch (\Throwable $th) {
      //throw $th;
      return reponse()->json([
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
    $productFeatureData = $request->all()['payload'];

    try {
      $data = ProductFeature::create([

        'product_id' => $productFeatureData['product_id'],
        'size' => $productFeatureData['size'],
        'color' => $productFeatureData['color']
      ]);
      return response()->json([
        'success' => true,
        'data' => $data
      ], 200);
    } catch (Exception $th) {
      //throw $th;
      return response()->json(
        [
          'success' => false,
          'errors' => $e->getMessage()
        ],
        500
      );
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    try {
      $productFeature = ProductFeature::with('product')->where("id", $id)->get();
      return new ProductFeatureCollection($productFeature);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getError()
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
    $productFeatureData = $request->all()['payload'];
    try {
      ProductFeature::find($id)->update($productFeatureData);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
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
      ProductFeature::find($id)->delete();
    } catch (Exception $th) {
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
