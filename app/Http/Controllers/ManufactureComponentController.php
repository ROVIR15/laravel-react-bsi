<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\ManufactureComponent;
use App\Models\Inventory\Inventory;

class ManufactureComponentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
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
      
      $_param = (array) [];
      $_changes = (array) [];

      try {
        //code...
        foreach ($param as $component) {
            # code...
          if($component['qty_consumed'] <= 0) return;
          $data = ManufactureComponent::find($component['id']);
          if($data['qty_keep'] >= $data['qty_to_be_consumed']) {
            $data->qty_keep;
          } else {
            $data->qty_keep = $component['qty_keep'];
            Inventory::create([
              'facility_id' => $component['facility_id'],
              'product_feature_id' => $component['product_feature_id'],
              'qty_on_hand' => $component['qty_consumed']*-1
            ]);
          }
          $data->save();
        }

        return response()->json([
          'success' => true
        ], 200);
      } catch (Exception $th) {
          //throw $th;
          return response()->json([
              'success' => false,
              'error' => $th->getMessage()
          ], 500);
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
        InvoiceRoleType::find($id)->delete();
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
