<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shipment\Shipment;
use App\Http\Controllers\Controller;
use App\Http\Resources\Shipment\ShipmentOneCollection;
use App\Http\Resources\Shipment\Shipment as ShipmentCollection;


class ShipmentController extends Controller
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
      $query = Shipment::all();

      return new ShipmentCollection($query);
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
        Shipment::create([
          'id' => $faker->unique()->numberBetween(1,3189)
        ]);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
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
        $query = Shipment::find($id);
        return new ShipmentOneCollection($query);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
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
        Shipment::find($id)->update($orderShipmentData);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
      }
      return response()->json([
        'success' => true
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
        Shipment::find($id)->delete();
        return response()->json([ 'success'=> true ], 200);
      } catch (Exception $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ]);
      }
    }
}