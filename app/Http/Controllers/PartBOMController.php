<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use App\Models\Product\PartBOM;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\PartBOMCollection;
use App\Http\Resources\Product\PartBOM as PartBOMOneCollection;

class PartBOMController extends Controller
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
      $query = new PartBOM();

      return new PartBOMCollection($query);
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
      $param = $request->all()['payload'];
      try {
        PartBOM::create([
            'product_id' => $param['product_id'],
            'qty_used' => $param['qty_used'],
            'description' => $param['description']
        ]);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
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
    public function show($id)
    {
      try {
        $query = PartBOM::find($id);
        return new PartBOMOneCollection($query);
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
    public function update(Request $request, X $x)
    {
      $param = $request->all()['payload'];
      try {
        PartBOM::find($id)->update($param);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
        ], 500);
      }

      return response()->json([
        'success'=> true
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy(X $x)
    {
      try {
        PartBOM::find($id)->delete();
      } catch (\Throwable $th) {
        return response()->json([
            'success'=> false,
            'errors'=> $th->getError()
          ], 500);
      }
      return response()->json([
        'success'=> true
      ], 200);
    }
}
