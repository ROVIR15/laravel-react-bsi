<?php

namespace App\Http\Controllers;

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
    public function store(Request $request)
    {

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
