<?php

namespace App\Http\Controllers;

use Faker\Generator as Faker;

use Illuminate\Http\Request;
use App\Models\Product\Product;
use App\Models\Product\ProductInformationView;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\Product as ProductOneCollection;
use App\Http\Resources\Product\ProductCollection;

class ProductController extends Controller
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
      $query = ProductInformationView::all();

      return new ProductCollection($query);
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
      $productData = $request->all()['payload'];
      try {
        $data = Product::create([
          'service_id' => $productData['service_id'],
          'goods_id' => $productData['goods_id'],
          'name' => $productData['name'],
          'part_id' => $productData['part_id'],
          'id' => $faker->unique()->numberBetween(982,2147)
        ]);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors' => $th->getMessage()
        ], 500);
      }

      return response()->json([
        'success'=> true
      ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show(X $x)
    {
        //
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
    public function update(Request $request, X $x)
    {
        //
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
        Product::find($id)->delete();
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
