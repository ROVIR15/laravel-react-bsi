<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use App\Models\RRQ\Quote;
use App\Models\RRQ\QuoteItem;
use App\Http\Controllers\Controller;
use App\Http\Resources\RRQ\Quote as QuoteOneCollection;
use App\Http\Resources\RRQ\QuoteCollection;
use App\Http\Resources\RRQ\QuoteViewCollection;
use Illuminate\Support\Facades\DB;

class RFQController extends Controller
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
      $query = $quote->where('quote_type', 'PO')->get();

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
    public function store(Request $request)
    {
        $param = $request->all()['payload'];
        try {
          //code...
          DB::beginTransaction();
          $rfqCreation = Quote::create([
            'quote_type' => $param['quote_type'],
            'po_number' => $param['po_number'],
            'delivery_date' => $param['delivery_date'],
            'party_id' => $param['bought_from'],
            'ship_to' => $param['ship_to'],
            'issue_date' => $param['issue_date'],
            'valid_thru' => $param['valid_thru'],
            'tax' => $param['tax'],
            'currency_id' => $param['currency_id']
          ]);
          DB::commit();
          $rfqItemsCreation = [];
  
          foreach($param['quote_items'] as $key){
            array_push($rfqItemsCreation, [
              'quote_id' => $rfqCreation['id'],
              'product_id' => $key['product_id'],
              'product_feature_id' => $key['product_feature_id'],
              'costing_item_id' => $key['costing_item_id'],
              'qty' => $key['qty'],
              'unit_price' => $key['unit_price']
            ]);
          }
  
          QuoteItem::insert($rfqItemsCreation);
          DB::commit();
        } catch (Exception $th) {
          DB::rollBack();
          return response()->json([
            'success' => false,
            'error' => $th->getMessage()
          ]);
        }

        return response()->json([
          'success' => true,
          'title' => 'RF-Quotation Creation',
          'message' => 'The new quotation has been created #' . $rfqCreation->id,
          'link' => '/purchasing/request-for-quotation/' . $rfqCreation->id,
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
        $query = Quote::with('quote_item', 'status')->find($id);
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
