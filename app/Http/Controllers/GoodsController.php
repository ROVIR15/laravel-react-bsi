<?php
  
  namespace App\Http\Controllers;

  use Faker\Generator as Faker;
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
      $query = DB::table("product as p")
      ->rightJoin("goods as g", function($join){
        $join->on("g.id", "=", "p.goods_id");
      })
      ->leftJoin("product_has_category as phc", function($join){
        $join->on("phc.product_id", "=", "p.id");
      })
      ->leftJoin("product_category as pc", function($join){
        $join->on("phc.product_category_id", "=", "pc.id");
      })
      ->select("g.id", "g.brand as brand", "g.name", "g.imageUrl", "g.satuan as unit_measurement", "g.value", "pc.name as category")
      ->get();

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
    public function store(Request $request, Faker $faker)
    {
      $goodsParam = $request->all()['payload']['goods'];
      $catParam = $request->all()['payload']['category'];
      $feature_size = $request->all()['payload']['feature_one'];
      $feature_color= $request->all()['payload']['feature_two'];
      
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
            $id = $faker->unique()->numberBetween(1,8939);
            $temp = [
              'id' => $id,
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

            $inventory = [
              'facility_id' => $facility_cat,
              'product_feature_id' => $id,
              'qty_on_hand' => 0
            ];

            array_push($inventory_items, $inventory);
          }
        }

        ProductFeature::insert($items);
        Inventory::insert($inventory_items);
        
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors' => $th->getMessage()
        ], 500);
      }
      return response()->json([
        'success'=> true,
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
          'value' => $goodsParam['value']
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
