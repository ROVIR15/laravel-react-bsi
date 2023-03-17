<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FInance\Currency;
use App\Models\FInance\CurrencyHistory;

class CurrencyController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        try {
            $query = Currency::all();

            $query2 = CurrencyHistory::orderBy('created_at', 'desc')->get();

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([ 'success' => false, 'errors' => $th->getMessage()], 500);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'usd' => $query[0]['exchange_rate'],
                'idr' => $query[1]['exchange_rate'],
                'history' => $query2    
            ]
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
      $param = $request->all()['payload'];

      try {
        $get_current_idr_exchange = Currency::find(2);

        Currency::find(1)->update([ "exchange_rate" => $param['usd'] ]);
        Currency::find(2)->update([ "exchange_rate" => $param['idr'] ]);

        CurrencyHistory::create([
            'idr' => $get_current_idr_exchange['exchange_rate']
        ]);

      } catch (Exception $th) {
        return response()->json([ 'success' => false, 'errors' => $th->getMessage()], 500);
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
        $orderStatusData = OrderStatus::find($id);
        return new OrderStatusOneCollection($orderStatusData);

      } catch (Exception $th) {
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
      $orderStatusData = $request->all()['payload'];

      try {
        if(empty($id)) return response()->json([ 'success' => false, 'errors' => 'id not found']);
        Currency::find($id)->update($orderStatusData);
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        OrderStatus::find($id)->delete();
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