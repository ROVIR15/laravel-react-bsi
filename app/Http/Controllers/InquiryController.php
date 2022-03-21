<?php

namespace App\Http\Controllers;

use Faker\Generator as Faker;

use App\Models\RRQ\Request as Inquiry;
use App\Models\RRQ\RequestItem as InquiryItem;
use App\Models\Product\ProductFeature;

use App\Http\Resources\RRQ\Request as RequestOneCollection;
use App\Http\Resources\RRQ\RequestCollection;
use Illuminate\Http\Request;

class InquiryController extends Controller
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
      $query = Inquiry::with('request_item')->get();

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
        $inquiryCreation = Inquiry::create([
          'id' => $faker->unique()->numberBetween(1,8939),
          'serial_req' => $param['serial_req'],
          'buyer_id' => $param['buyer_id'],
          'buyer_shipment_id' => $param['buyer_shipment_id'],
          'po_number' => $param['po_number'],
          'release_date' => $param['release_date'],
          'req_deliv_date' => $param['req_deliv_date'],
          'valid_until' => $param['valid_until']
        ]);

        $inquiryItemCreation = [];

        foreach($param['inquiry_item'] as $key){
          array_push($inquiryItemCreation, [
            'id' => $faker->unique()->numberBetween(1,8939),
            'request_id' => $inquiryCreation['id'],
            'product_feature_id' => $key['product_feature_id'],
            'qty' => $key['qty']
          ]);
        }

        InquiryItem::insert($inquiryItemCreation);

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
        $query = Inquiry::with('request_item')->find($id);
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
            Inquiry::find($id)->update($param);
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
        $inquiry = new Inquiry;

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
