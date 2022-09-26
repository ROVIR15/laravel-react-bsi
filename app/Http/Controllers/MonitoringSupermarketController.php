<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Monitoring\Supermarket;

class MonitoringSupermarketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $param = $request->has('sales-order');
      $query = [];

      if($param){
        $query = Supermarket::groupBy('date', 'product_feature_id', 'po_number', 'sales_order_id', 'order_id')->orderBy('date', 'desc')->with('sales_order', 'product_feature', 'sewing')->where('sales_order_id', $request->query('sales-order'))->get();
      } else {
        $query = Supermarket::with('sales_order', 'product_feature', 'sewing')->get();
      }

      return response()->json(['data' => $query]);
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
          Supermarket::insert($param);
          
          return response()->json(['success' => true]);
        } catch (Throwable $th) {
          //throw $th;
          return response()->json(
            [
              'success' => false,
              'errors' => $th->getMessage()
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
        $res = Supermarket::with('order_item', 'sales_order')->find($id);
        return response()->json(['data' => $res]);
    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }
}
