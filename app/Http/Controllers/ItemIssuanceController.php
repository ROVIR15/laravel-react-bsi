<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shipment\ItemIssuance;
use App\Models\Inventory\Inventory;
use App\Http\Controllers\Controller;
use App\Http\Resources\Shipment\ItemIssuance as ItemIssuanceOneCollection;
use App\Http\Resources\Shipment\ItemIssuanceCollection;

class ItemIssuanceController extends Controller
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
      $query = ItemIssuance::all();

      return new ItemIssuanceCollection($query);
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

        $payloadItems = [];
        $invItems = [];

        foreach ($param as $item) {
          # code...
          array_push($payloadItems, [
            'shipment_item_id' => $item['id'],
            'shipment_id' => $item['shipment_id'],
            'item_issued' => $item['qty_ship']
          ]);
        }

        foreach ($param as $item) {
          # code...
          array_push($invItems, [
            'facility_id' => 1,
            'product_feature_id' => $item['product_feature_id'],
            'qty_on_hand' =>  $item['qty_ship']*-1
          ]);
        }

        ItemIssuance::insert($payloadItems);

        Inventory::insert($invItems);

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
        $query = ItemIssuance::find($id);
        return new ItemIssuanceOneCollection($query);
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
    public function update($id, Request $request)
    {
      $param = $request->all()['payload'];
      try {
        ItemIssuance::find($id)->update($param);
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
    public function destroy($id)
    {
      try {
        ItemIssuance::find($id)->delete();
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
