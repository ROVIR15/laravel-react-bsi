<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product\ProductFeature;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductFeature as ProductFeatureCollection;

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
    public function store(Request $request)
    {
      $productFeatureData = $request->all()['payload'];

      try {
        ProductFeature::insert($productFeatureData);
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
      return response()->json([
        'success' => true
      ], 200);
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
        $productFeature = ProductFeature::find($id);
        return new ProductFeatureCollection($id);
      } catch (\Throwable $th) {
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
    public function update($product_id, Request $request)
    {
      $productFeatureData = $request->all()['payload'];
      try {
        ProductFeature::where('product_id', $product_id)->update($productFeatureData);
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
