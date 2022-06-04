<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MaterialAdditionOnManufactureComponentController extends Controller
{
    //
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
}
