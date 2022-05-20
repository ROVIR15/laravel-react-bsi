<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory\Inventory;

class ProductionRecorderController extends Controller
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
      $query = new Status();

      return new StatusCollection($query);
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

          Inventory::create([
            'facility_id' => $param['facility_id'],
            'product_feature_id' => $param['product_feature_id'],
            'qty_on_hand' => $param['qty_produced']
          ]);

          Inventory::create([
            'facility_id' => $param['facility_id'],
            'product_feature_id' => $param['product_feature_id'],
            'qty_on_hand' => $param['qty_rejected']
          ]);

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


}
