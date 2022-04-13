<?php

namespace App\Http\Controllers;
use Faker\Generator as Faker;
use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\RRQ\QuoteItem;
use App\Http\Controllers\Controller;
use App\Http\Resources\RRQ\QuoteItem as QuoteItemOneCollection;
use App\Http\Resources\RRQ\QuoteItemCollection;

class QuoteItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, QuoteItem $quoteItem)
    {
      $param = $request->all();
      $query = $quoteItem->all();

      return new QuoteItemCollection($query);
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
    public function store(Request $request, Faker $faker)
    {
        $param = $request->all()['payload'];
        $current_date_time = Carbon::now()->toDateTimeString();
        try {
            //code...
            $quoteItemsCreation = [];
  
            foreach($param as $key){
              array_push($quoteItemsCreation, [
                'id' => $faker->unique()->numberBetween(1,8939),
                'quote_id' => $key['quote_id'],
                'request_item_id' => $key['inquiry_item_id'],
                'product_feature_id' => $key['product_feature_id'],
                'qty' => $key['qty'],
                'unit_price' => $key['unit_price'],
                'created_at' => $current_date_time
              ]);
            }

            QuoteItem::insert($quoteItemsCreation);

        } catch (Exception $th) {
            //throw $th;
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
        try {
            //code...
            $_rI = QuoteItem::with('product_feature')->find($id);

            return new QuoteItemOneCollection($_rI);
        } catch (Exception $th) {
            //throw $th;
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
        //
        $param = $request->all()['payload'];

        try {
            //code...
            QuoteItem::where('id', $id)->update($param);
        } catch (Exception $th) {
            //throw $th;
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
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $quoteItem = new QuoteItem;
        
        try {
            //code...
            $quoteItem->find($id)->delete();
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
