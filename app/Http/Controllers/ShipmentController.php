<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shipment\Shipment;
use App\Models\Shipment\ShipmentView;
use App\Models\Shipment\ShipmentItem;
use App\Http\Controllers\Controller;
use App\Http\Resources\Shipment\ShipmentCollection;
use App\Http\Resources\Shipment\Shipment as ShipmentOneCollection;


class ShipmentController extends Controller
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
      $query = ShipmentView::with('item', 'buyer', 'ship', 'sales_info')->get();

      return new ShipmentCollection($query);
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
        $shipment = Shipment::create([
          'delivery_date'=> $param['delivery_date'],
          'order_id'=> $param['order_id']
        ]);

        //shipment item variable
        $shipmentItemP = [];

        //Arrange the data
        foreach($param['OD_items'] as $item){
          array_push($shipmentItemP, [
            'shipment_id' => $shipment->id,
            'order_item_id' => $item['po_item_id'],
            'qty_shipped' => $item['deliv_qty']
          ]);
        }

        ShipmentItem::insert($shipmentItemP);
      
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
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
        $query = ShipmentView::with('item', 'buyer', 'ship', 'sales_info')->find($id);
        return new ShipmentOneCollection($query);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
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
        Shipment::find($id)->update($param);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
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
        Shipment::find($id)->delete();
        return response()->json([ 'success'=> true ], 200);
      } catch (Exception $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ]);
      }
    }
}
