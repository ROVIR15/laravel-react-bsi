<?php

namespace App\Http\Controllers;

use Faker\Generator as Faker;

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
      $param = $request->all();
      $query = ProductFeature::all();

      return new ProductFeatureCollection($query);
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
      $productFeatureData = $request->all()['payload'];

      try {
        $data = ProductFeature::create([
          'id' => $faker->unique()->numberBetween(1,8939),
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
        $productFeature = ProductFeature::find("product_id", $product_id)->get();
        return new ProductFeatureCollection($productFeature);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
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
