<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;
use App\Models\Invoice\InvoiceHasShipment;
use App\Models\Shipment\Shipment;
use App\Models\Shipment\ShipmentView;
use App\Models\Shipment\ShipmentItem;
use App\Models\Shipment\ShipmentStatus;
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
      $type = $request->query('shipment_type');
      $monthYear = $request->query('monthYear');


      try {
        //code...
        if(isset($monthYear)){    
          $monthYear = date_create($monthYear);
          $month = date_format($monthYear, 'm');
          $year = date_format($monthYear, 'Y');
    
          if(isset($type)){
            $query = Shipment::with('order', 'type', 'status', 'sum')
            ->whereHas('type', function($query) use ($type){
              $query->where('id', $type);
            })
            ->whereYear('delivery_date', '=', $year)
            ->whereMonth('delivery_date', '=', $month)
            ->get();
          } else {
            $query = Shipment::with('order', 'type', 'status', 'sum')
            ->whereYear('delivery_date', '=', $year)
            ->whereMonth('delivery_date', '=', $month)
            ->get();
          }  
        } else {
          if(isset($type)){
            $query = Shipment::with('order', 'type', 'status', 'sum')
            ->where('shipment_type_id', $type)
            ->orderBy('order_id', 'asc')
            ->get();
          } else {
            $query = Shipment::with('order', 'type', 'status', 'sum')
            ->get();
          }  
        }
  
      } catch (\Throwable $th) {
        //throw $th;

        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json(['data' => $query]);
    }

    public function shipmentInvoicing(Request $request){
      $type = $request->query('shipment_type');

      try {
        $_shipmentHasInvoice = InvoiceHasShipment::select('shipment_id')->get();
        if(isset($type)){
          $query = Shipment::with('order', 'type', 'status', 'items')
          ->where('shipment_type_id', $type)
          ->whereNotIn('id', $_shipmentHasInvoice)
          ->orderBy('order_id', 'asc')
          ->get();
        } else {
          $query = Shipment::with('order', 'type', 'status', 'items')
          ->whereNotIn('id', $_shipmentHasInvoice)
          ->get();
        }  
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'succees' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'data' => $query
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
        $shipment = Shipment::create([
          'comment'=> $param['comment'] ,
          'serial_number'=> $param['serial_number'],
          'est_delivery_date'=> $param['est_delivery_date'],
          'delivery_date'=> $param['delivery_date'],
          'shipment_type_id'=> $param['shipment_type_id'],
          'order_id'=> $param['order_id']
        ]);

        //shipment item variable
        $shipmentItemP = [];

        //Arrange the data
        foreach($param['OD_items'] as $item){
          array_push($shipmentItemP, [
            'shipment_id' => $shipment->id,
            'order_item_id' => $item['order_item_id'],
            'qty_shipped' => $item['deliv_qty'],
            'description' => $item['description']
          ]);
        }

        ShipmentItem::insert($shipmentItemP);
      
        ShipmentStatus::create([
          'shipment_type_status_id' => 5,
          'user_id'=> $param['user_id'],
          'shipment_id' => $shipment->id
        ]);

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
        $query = Shipment::with('items', 'order', 'type', 'status')->find($id);
        return response()->json(['data' => $query]);
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
