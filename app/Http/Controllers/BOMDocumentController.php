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
    
  class ServiceController extends Controller
  {
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $query = ProductHasCategory::where('product_category_id', 9)->with('product', 'category')->get();

      return response()->json([
        "success" => true,
        "data" => $query
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
        
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors' => $th->getMessage()
        ], 500);
      }
      return response()->json([
        'success'=> true,
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
        $tes = $product->where('goods_id', $id)->get();
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
        ProductHasCategory::where('product_id', $existingProduct['id'])
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
