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

    public function showFabric(){
      try {
        //code...
        $query = ProductFeature::whereHas('product_category', function($query){
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
        $productFeature = ProductFeature::with('product')->where("product_id", $id)->get();
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
