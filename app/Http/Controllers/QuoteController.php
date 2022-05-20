<?php

namespace App\Http\Controllers;

use Faker\Generator as Faker;

use Illuminate\Http\Request;
use App\Models\RRQ\Quote;
use App\Models\RRQ\QuoteView;
use App\Models\RRQ\QuoteItem;
use App\Http\Controllers\Controller;
use App\Http\Resources\RRQ\Quote as QuoteOneCollection;
use App\Http\Resources\RRQ\QuoteView as QuoteViewOneCollection;
use App\Http\Resources\RRQ\QuoteCollection;
use App\Http\Resources\RRQ\QuoteViewCollection;

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
      $type = $request->query('type');
      $query;

      switch ($type) {
        case 'SO':
          # code...
          $query = Quote::where('quote_type', 'SO')->get();
          break;
        case 'PO':
          # code...
          $query = Quote::where('quote_type', 'PO')->get();
          break;
        default:
          # code...
          $query = Quote::all();
          break;
      }

      return new QuoteViewCollection($query);
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
        try {
          //code...
          $id = $faker->unique()->numberBetween(1,8939);
          $quoteCreation = Quote::create([
            'id' => $id,
            'quote_type' => $param['quote_type'],
            'po_number' => $param['po_number'],
            'delivery_date' => $param['delivery_date'],
            'party_id' => $param['sold_to'],
            'ship_to' => $param['ship_to'],
            'issue_date' => $param['issue_date'],
            'valid_thru' => $param['valid_thru']
          ]);
          
          $quoteItemsCreation = [];
  
          foreach($param['quote_items'] as $key){
            array_push($quoteItemsCreation, [
              'id' => $faker->unique()->numberBetween(1,8939),
              'quote_id' => $id,
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
      try {
        $query = Quote::find($id);
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
    public function destroy($id)
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
