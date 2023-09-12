<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Exception;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Models\Invoice\InvoiceHasShipment;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;
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
      if (isset($monthYear)) {
        $monthYear = date_create($monthYear);
        $month = date_format($monthYear, 'm');
        $year = date_format($monthYear, 'Y');

        if (isset($type)) {
          if ($type === "34") {
            $query = Shipment::with('order', 'type', 'status', 'sum', 'ship_to')
              ->whereHas('type', function ($query) {
                $query->whereIn('id', [3, 4]);
              })
              ->whereYear('delivery_date', '=', $year)
              ->whereMonth('delivery_date', '=', $month)
              ->get();
          } else {
            $query = Shipment::with('order', 'type', 'status', 'sum')
              ->whereHas('type', function ($query) use ($type) {
                $query->where('id', $type);
              })
              ->with('__items')
              ->whereYear('delivery_date', '=', $year)
              ->whereMonth('delivery_date', '=', $month)
              ->orderBy('id', 'desc')
              ->get();
          }
        } else {
          $query = Shipment::with('order', 'type', 'status', 'sum')
            ->whereYear('delivery_date', '=', $year)
            ->whereMonth('delivery_date', '=', $month)
            ->get();
        }
      } else {
        if (isset($type)) {
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

  public function shipmentInvoicing(Request $request)
  {
    $type = $request->query('shipment_type');

    try {
      $_shipmentHasInvoice = InvoiceHasShipment::select('shipment_id')->get();
      if (isset($type)) {
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

    $__ship_to = $param['shipment_type_id'] === 3 || $param['shipment_type_id'] === 4 ? $param['ship_to'] : 0;
    try {
      $shipment = Shipment::create([
        'comment' => $param['comment'],
        'serial_number' => $param['serial_number'],
        'est_delivery_date' => $param['est_delivery_date'],
        'delivery_date' => $param['delivery_date'],
        'shipment_type_id' => $param['shipment_type_id'],
        'subcontract_flag' => $param['subcontract_flag'],
        'order_id' => $param['order_id'],
        'ship_to' => $__ship_to
      ]);

      //shipment item variable
      $shipmentItemP = [];

      //Arrange the data
      foreach ($param['OD_items'] as $item) {
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
        'user_id' => $param['user_id'],
        'shipment_id' => $shipment->id
      ]);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
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
      $query = Shipment::with('items', 'order', 'type', 'status', 'ship_to')->find($id);
      return response()->json(['data' => $query]);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
  }

  /**
   * Post incoming goods request from order type 'purchase'
   * 
   * @param id an ID of requested order (purhcase order)
   * @return \Illuminate\Http\Response
   */

  public function postIncomingGoods(Request $request)
  {
    $orderId = $request->all()['payload']['id'];
    $userId = $request->all()['payload']['user_id'];

    try {

      $check_order_shipment = Shipment::where('order_id', $orderId)->get();

      if (count($check_order_shipment) > 0) throw new Exception("Error Processing Request Due To Order Already Made A Shipment");

      $purchaseOrder = Order::where('id', $orderId)->with('purchase_order')->get();

      $orderItem = OrderItem::where('order_id', $orderId)->get();

      $serialNumber = Str::random(10);

      $payloadShipment = [
        'serial_number' => $serialNumber,
        'shipment_type_id' => 1,
        'est_delivery_date' => $purchaseOrder[0]['purchase_order']['delivery_date'],
        'delivery_date' => date('Y-m-d'),
        'order_id' => $orderId,
        'imageUrl' => NULL,
        'comment' => $purchaseOrder[0]['description']
      ];

      $shipment_creation = Shipment::create($payloadShipment);

      $payloadShipmentStatus = [
        'shipment_type_status_id' => 3,
        'shipment_id' => $shipment_creation['id'],
        'user_id' => $userId
      ];

      ShipmentStatus::create($payloadShipmentStatus);

      $order_to_shipment_item = [];

      foreach ($orderItem as $item) {
        array_push($order_to_shipment_item, [
          'shipment_id' => $shipment_creation['id'],
          'order_item_id' => $item['id'],
          'qty_shipped' => 0,
          'description' => $item['description']
        ]);
      }

      ShipmentItem::insert($order_to_shipment_item);
    } catch (\Throwable $th) {

      return response()->json([
        'success' => false,
        'message' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'message' => 'Post Incoming Goods successfully created tell your warehouse admin to check data already inserted on their dashboard or not.'
    ]);
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
        'errors' => $th->getMessage()
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
    try {
      Shipment::find($id)->delete();
      return response()->json(['success' => true], 200);
    } catch (Exception $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ]);
    }
  }
}
