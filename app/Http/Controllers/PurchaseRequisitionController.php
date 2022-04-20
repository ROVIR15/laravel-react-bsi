<?php

namespace App\Http\Controllers;

use Faker\Generator as Faker;
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
      $query = PurReq::where('req_type', 'PurchaseReq')->with('request_item')->get();

      return new RequestCollection($query);
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
        $purReqCreation = PurReq::create([
          'id' => $faker->unique()->numberBetween(1,8939),
          'req_type' => 'PurchaseReq',
          'party_id' => $param['party_id'],
          'ship_to' => $param['ship_to'],
          'po_number' => $param['po_number'],
          'po_date' => $param['po_date'],
          'delivery_date' => $param['delivery_date'],
          'valid_to' => $param['valid_to']
        ]);

        $PRItemsCreation = [];

        foreach($param['pr_items'] as $key){
          array_push($PRItemsCreation, [
            'id' => $faker->unique()->numberBetween(1,8939),
            'request_id' => $purReqCreation['id'],
            'product_feature_id' => $key['id'],
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
        return new RequestOneCollection($query);
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
