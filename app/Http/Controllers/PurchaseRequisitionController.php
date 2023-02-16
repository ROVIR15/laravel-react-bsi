<?php

namespace App\Http\Controllers;


use Carbon\Carbon;

use App\Models\RRQ\Request as PurReq;
use App\Models\RRQ\RequestItem as PurReqItems;
use App\Models\Product\ProductFeature;

use App\Http\Resources\RRQ\Request as RequestOneCollection;
use App\Http\Resources\RRQ\RequestCollection;
use Illuminate\Http\Request;

class PurchaseRequisitionController extends Controller
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
      $query = PurReq::with('request_item')->where('req_type', 'PurchaseReq')->get();

        return response()->json(['data' => $query]);
        // return new RequestCollection($query);
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
        $purReqCreation = PurReq::create([
          'req_type' => 'PurchaseReq',
          'po_number' => $param['po_number'],
        ]);

        $PRItemsCreation = [];

        foreach($param['inquiry_item'] as $key){
          array_push($PRItemsCreation, [
            'request_id' => $purReqCreation['id'],
            'product_feature_id' => $key['product_featru'],
            'qty' => $key['qty'],
          ]);
        }

        PurReqItems::insert($PRItemsCreation);

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
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
      try {
        $query = PurReq::with('request_item')->find($id);
        return response()->json($query);
          // return new RequestOneCollection($query);
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
        $param = $request->all()['payload'];
        try {
            //code...
            PurReq::find($id)->update($param);
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
        $inquiry = new PurReq;

        try {
            //code...
            $inquiry->find($id)->delete();
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
