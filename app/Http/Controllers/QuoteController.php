<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RRQ\Quote;
use App\Models\RRQ\QuoteItem;
use App\Http\Controllers\Controller;
use App\Http\Resources\RRQ\Quote as QuoteOneCollection;
use App\Http\Resources\RRQ\QuoteCollection;

class QuoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Quote $quote)
    {
      $param = $request->all();
      $query = $quote->all();

      return new QuoteCollection($query);
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
            //code...
          $quoteCreation = Quote::create([
            'issue_date' => $param['serial_req'],
            'valid_from' => $param['buyer_id'],
            'valid_thru' => $param['buyer_shipment_id']
          ]);
  
          $quoteItemsCreation = [];
  
          foreach($param['quote_items'] as $key){
            array_push($quoteItemsCreation, [
              'id' => $faker->unique()->numberBetween(1,8939),
              'quote_id' => $quoteCreation['id'],
              'request_item_id' => $key['request_item_id'],
              'product_feature_id' => $key['product_feature_id'],
              'qty' => $key['qty'],
              'unit_price' => $key['unit_price']
            ]);
          }
  
          QuoteItem::insert($quoteItemsCreation);
  
        } catch (Exception $th) {
          return response()->json([
            'success' => false,
            'error' => $th->getMessage()
          ]);
        }
  
        return response()->json([
          'success' => true
        ]);        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
      try {
        $query = Quote::with('quote_item')->find($id);
        return new QuoteOneCollection($query);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {

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
            //code...
            Quote::find($id)->update($param);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
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
    public function destroy(X $x)
    {
        $quote = new Quote;

        try {
            //code...
            $quote->find($id)->delete();
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