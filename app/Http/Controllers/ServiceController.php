<?php
  
  namespace App\Http\Controllers;

  
  use Exception;

  use Illuminate\Support\Facades\DB;
  use Illuminate\Http\Request;
  use App\Models\Product\Service;
  use App\Models\Product\Product;
  use App\Models\Inventory\Inventory;
  use App\Models\Product\ProductFeature;
  use App\Models\Product\ProductHasCategory;

  use App\Http\Controllers\Controller;
  use App\Http\Resources\Product\ServiceCollection;
  use App\Http\Resources\Product\Service as ServiceOneCollection;
    
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
      $query = ProductHasCategory::where('product_category_id', 9)->with('service', 'category')->get();

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
      $serviceParam = $request->all()['payload']['service'];
      $catParam = $request->all()['payload']['category'];
      
      try {
        $service = Service::create([
          'name' => $serviceParam['name']
        ]);

        if($service->id) {
          $product = Product::create([
            'service_id' => $service->id,
          ]);  

          $productHasCategory = ProductHasCategory::create([
            'product_id' => $product['id'],
            'product_category_id' => $catParam
          ]);
        } else {
          Service::find($service->id)->delete();
        }

      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors' => $th->getMessage()
        ], 500);
      }
      return response()->json([
        'success'=> true,
        'ss' => $service['id']
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
        $tes = Product::where('service_id', $id)->get();
        $_service = Service::find($tes[0]['service_id']);

        return new ServiceOneCollection($_service);
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
      $serviceParam = $request->all()['payload']['service'];
      $catParam = $request->all()['payload']['category'];
      try {
        $existingProduct = Product::find($id);

        Service::find($id)->update([
          'name' => $serviceParam['name']
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
        $existingData = Service::find($id);

        //Delete Goods
        $existingData->delete();
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
