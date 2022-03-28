<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product\Service;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\Service as ServiceOneCollection;
use App\Http\Resources\Product\ServiceCollection;

class ServiceController extends Controller
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
      $query = Service::all();

      return new ServiceCollection($query);
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
    public function store(Request $request, Product $product)
    {
      $param = $request->all()['payload'];
      
      try {
        $service = Service::create([
          'id' => $faker->unique()->numberBetween(1,8939)
        ]);

        $products = $product->insert([
          'goods_id' => $service->id,
          'name' => $param['name'],
          'part_id' => $param['part_id'],
          'id' => $faker->unique()->numberBetween(1,8939)
        ]);
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
    public function show($id)
    {
      try {
        $serviceData = Service::find($id);
        return new ServiceOneCollection($serviceData); 
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
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
      $param = $request->all()['payload'];
      try {
        Service::find($id)->update($param);
      } catch (Exception $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ], 500);
      }
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
        Service::find($id)->delete();
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