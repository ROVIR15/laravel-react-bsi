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
use App\Models\Inventory\GoodsMovement;
use App\Models\Inventory\MaterialTransfer;
use App\Models\Inventory\MaterialTransferItem;
use App\Models\Inventory\MaterialTransferRealisation;
use App\Models\Inventory\MaterialTransferShipmentRelationship;
use Illuminate\Support\Facades\DB;

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
            $query = Shipment::with('order', 'reconcile_based_sales_order', 'type', 'status', 'sum', 'ship_to')
              ->whereHas('type', function ($query) {
                $query->whereIn('id', [3, 4]);
              })
              ->whereYear('delivery_date', '=', $year)
              ->whereMonth('delivery_date', '=', $month)
              ->orderBy('id', 'desc')
              ->get();
          } else {
            $query = Shipment::with('order', 'reconcile_based_sales_order', 'type', 'status', 'sum', '__items')
              ->whereHas('type', function ($query) use ($type) {
                $query->where('id', $type);
              })
              ->whereYear('delivery_date', '=', $year)
              ->whereMonth('delivery_date', '=', $month)
              ->orderBy('id', 'desc')
              ->get();
          }
        } else {
          $query = Shipment::with('order', 'reconcile_based_sales_order', 'type', 'status', 'sum')
            ->with('__items')
            ->whereYear('delivery_date', '=', $year)
            ->whereMonth('delivery_date', '=', $month)
            ->orderBy('id', 'desc')
            ->get();
        }
      } else {
        if (isset($type)) {
          $query = Shipment::with('order', 'reconcile_based_sales_order', 'type', 'status', 'sum', '__items')
            // ->with(['__items' => function ($query){
            //   return $query->select('costing_item_id');
            // }])
            ->where('shipment_type_id', $type)
            ->orderBy('order_id', 'asc')
            ->get();
        } else {
          $query = Shipment::with('order', 'reconcile_based_sales_order', 'type', 'status', 'sum')
            ->orderBy('id', 'asc')
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

  public function shipmentListSubcontract(Request $request)
  {

    try {
      //code...
      $query = Shipment::with('order')
        ->whereHas('type', function ($query) {
          $query->whereIn('id', [4]);
        })
        ->orderBy('id', 'desc')
        ->get();

    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $query
    ]);
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
      $__subcontract_flag = isset($param['subcontract_flag']) ? $param['subcontract_flag'] : false;
      DB::beginTransaction();
      $shipment = Shipment::create([
        'comment' => $param['comment'],
        'serial_number' => $param['serial_number'],
        'est_delivery_date' => $param['est_delivery_date'],
        'delivery_date' => $param['delivery_date'],
        'shipment_type_id' => $param['shipment_type_id'],
        'subcontract_flag' => $__subcontract_flag,
        'order_id' => $param['order_id'],
        'ship_to' => $__ship_to
      ]);

      //shipment item variable
      $shipmentItemP = [];

      //Arrange the data
      foreach ($param['OD_items'] as $item) {
        $__qty = isset($item['qty']) ? $item['qty'] : 0;

        array_push($shipmentItemP, [
          'shipment_id' => $shipment->id,
          'order_item_id' => $item['order_item_id'],
          'qty' => $__qty,
          'qty_shipped' => $item['deliv_qty'],
          'description' => $item['description']
        ]);
      }

      ShipmentItem::insert($shipmentItemP);
      DB::commit();

      ShipmentStatus::create([
        'shipment_type_status_id' => 5,
        'user_id' => $param['user_id'],
        'shipment_id' => $shipment->id
      ]);
      DB::commit();

      // material_transfer_for_subcontract($param['shipment_type_id'], 2, $shipment['id'], )

    } catch (Exception $th) {
      DB::rollback();
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }

    if ($param['shipment_type_id'] === 1 || $param['shipment_type_id'] === 3) {
      return response()->json([
        'success' => true,
        'title' => 'The Incoming Shipment',
        'message' => 'The Shipment has been created' . $shipment->id,
        'link' => '/shipment/incoming/' . $shipment->id
      ], 200);
    } else if ($param['shipment_type_id'] === 2 || $param['shipment_type_id'] === 4) {
      return response()->json([
        'success' => true,
        'title' => 'The Outbound Shipment',
        'message' => 'The Outbound Shipment has been created' . $shipment->id,
        'link' => '/shipment/outgoing/' . $shipment->id
      ], 200);
    } else {
      return response()->json([
        'success' => true,
        'title' => 'The Shipment',
        'message' => 'The Shipment has been created' . $shipment->id,
        'link' => '/shipment/incoming/' . $shipment->id
      ], 200);
    }
  }

  public function material_transfer_for_subcontract($type_of_subcontract, $userId, $shipmentId, $items)
  {
    // try {
    //   switch ($type_of_subcontract) {
    //     case 4:
    //       DB::beginTransaction();

    //       //check if this shipment already issued or the quantity is enough
    //       $mtsr = MaterialTransferShipmentRelationship::where('shipment_id', $param['shipment_id'])->get();
    
    //       if (count($mtsr)) {
    //         //check if the quantity is below
    //         return response()->json([
    //           'success' => false,
    //           'message' => 'sorry, you cannot issued twice'
    //         ]);
    //       }

    //       /// Initial
    //       $to_facility_id = 19; // Production
    //       $from_facility_id = null; // WIP
    //       $date = date("Y-m-d");
    //       $prep = [
    //         'to_facility_id' => $to_facility_id,
    //         'from_facility_id' => $from_facility_id,
    //         'est_transfer_date' => $date,
    //         'user_id' => $userId,
    //         'description' => 'Automatically Generated by System'
    //       ];
    
    //       $mt = MaterialTransfer::create($prep);

    //       $prep = [
    //         'to_facility_id' => $to_facility_id, // WIP
    //         'from_facility_id' => $from_facility_id,
    //         'est_transfer_date' => $date,
    //         'user_id' => $userId,
    //         'description' => 'Automatically Generated by System'
    //       ];
    
    //       $mt = MaterialTransfer::create($prep);

    //       DB::commit();
    
    //       foreach ($items as $key) {
    //         $_temp = [
    //           'material_transfer_id' => $mt['id'],
    //           'product_id' => $key['product_id'],
    //           'product_feature_id' => $key['product_feature_id'],
    //           'transfer_qty' => $key['deliv_qty']
    //         ];
    
    //         $mti = MaterialTransferItem::create($_temp);
    //         DB::commit();
    
    //         $mtr = MaterialTransferRealisation::create([
    //           'material_transfer_id' => $mt['id'],
    //           'material_transfer_item_id' => $mti['id'],
    //           'transferred_qty' => $key['deliv_qty']
    //         ]);
    //         DB::commit();
    
    //         // substract qty from from_facility_id and make record on goods movement
    //         GoodsMovement::create([
    //           'date' => $date,
    //           'material_transfer_id' => $mt['id'],
    //           'material_transfer_item_id' => $mti['id'],
    //           'material_transfer_item_realisation_id' => $mtr['id'],
    //           'facility_id' => $to_facility_id,
    //           'goods_id' => $key['goods_id'],
    //           'product_id' => $key['product_id'],
    //           'product_feature_id' => $key['product_feature_id'],
    //           'type_movement' => 2, // 1 for incoming and 2 outbound
    //           'qty' => $key['deliv_qty'],
    //         ]);
    //         DB::commit();

    //       /// 11111
    
    //       $to_facility_id = 4; // WIP
    //       $from_facility_id = 19; // Production General
    //       $date = date("Y-m-d");
    //       $prep = [
    //         'to_facility_id' => $to_facility_id,
    //         'from_facility_id' => $from_facility_id,
    //         'est_transfer_date' => $date,
    //         'user_id' => $userId,
    //         'description' => 'Automatically Generated by System'
    //       ];
    
    //       $mt = MaterialTransfer::create($prep);

    //       $prep = [
    //         'to_facility_id' => $to_facility_id, // WIP
    //         'from_facility_id' => $from_facility_id,
    //         'est_transfer_date' => $date,
    //         'user_id' => $userId,
    //         'description' => 'Automatically Generated by System'
    //       ];
    
    //       $mt = MaterialTransfer::create($prep);

    //       DB::commit();
    
    //       foreach ($items as $key) {
    //         $_temp = [
    //           'material_transfer_id' => $mt['id'],
    //           'product_id' => $key['product_id'],
    //           'product_feature_id' => $key['product_feature_id'],
    //           'transfer_qty' => $key['deliv_qty']
    //         ];
    
    //         $mti = MaterialTransferItem::create($_temp);
    //         DB::commit();
    
    //         $mtr = MaterialTransferRealisation::create([
    //           'material_transfer_id' => $mt['id'],
    //           'material_transfer_item_id' => $mti['id'],
    //           'transferred_qty' => $key['deliv_qty']
    //         ]);
    //         DB::commit();
    
    //         // substract qty from from_facility_id and make record on goods movement
    //         GoodsMovement::create([
    //           'date' => $date,
    //           'material_transfer_id' => $mt['id'],
    //           'material_transfer_item_id' => $mti['id'],
    //           'material_transfer_item_realisation_id' => $mtr['id'],
    //           'facility_id' => $from_facility_id,
    //           'goods_id' => $key['goods_id'],
    //           'product_id' => $key['product_id'],
    //           'product_feature_id' => $key['product_feature_id'],
    //           'type_movement' => 2, // 1 for incoming and 2 outbound
    //           'qty' => $key['deliv_qty'] * -1,
    //         ]);
    //         DB::commit();
    
    //         //add qty from to_facility_id and make record on goods_movement;
    //         GoodsMovement::create([
    //           'date' => $date,
    //           'material_transfer_id' => $mt['id'],
    //           'material_transfer_item_id' => $mti['id'],
    //           'material_transfer_item_realisation_id' => $mtr['id'],
    //           'facility_id' => $to_facility_id,
    //           'goods_id' => $key['goods_id'],
    //           'product_id' => $key['product_id'],
    //           'product_feature_id' => $key['product_feature_id'],
    //           'type_movement' => 1, // 1 for incoming and 2 outbound
    //           'qty' => $key['deliv_qty']
    //         ]);
    //         DB::commit();

    //         /// 22222
    //         $to_facility_id = null; // OUT
    //         $from_facility_id = 4; // WIP
    //         $date = date("Y-m-d");
    //         $prep = [
    //           'to_facility_id' => $to_facility_id,
    //           'from_facility_id' => $from_facility_id,
    //           'est_transfer_date' => $date,
    //           'user_id' => $userId,
    //           'description' => 'Automatically Generated by System'
    //         ];
      
    //         $mt = MaterialTransfer::create($prep);
  
    //         $prep = [
    //           'to_facility_id' => $to_facility_id, // WIP
    //           'from_facility_id' => $from_facility_id,
    //           'est_transfer_date' => $date,
    //           'user_id' => $userId,
    //           'description' => 'Automatically Generated by System'
    //         ];
      
    //         $mt = MaterialTransfer::create($prep);
  
    //         DB::commit();
      
    //         foreach ($items as $key) {
    //           $_temp = [
    //             'material_transfer_id' => $mt['id'],
    //             'product_id' => $key['product_id'],
    //             'product_feature_id' => $key['product_feature_id'],
    //             'transfer_qty' => $key['deliv_qty']
    //           ];
      
    //           $mti = MaterialTransferItem::create($_temp);
    //           DB::commit();
      
    //           $mtr = MaterialTransferRealisation::create([
    //             'material_transfer_id' => $mt['id'],
    //             'material_transfer_item_id' => $mti['id'],
    //             'transferred_qty' => $key['deliv_qty']
    //           ]);
    //           DB::commit();
      
    //           // substract qty from from_facility_id and make record on goods movement
    //           GoodsMovement::create([
    //             'date' => $date,
    //             'material_transfer_id' => $mt['id'],
    //             'material_transfer_item_id' => $mti['id'],
    //             'material_transfer_item_realisation_id' => $mtr['id'],
    //             'facility_id' => $from_facility_id,
    //             'goods_id' => $key['goods_id'],
    //             'product_id' => $key['product_id'],
    //             'product_feature_id' => $key['product_feature_id'],
    //             'type_movement' => 2, // 1 for incoming and 2 outbound
    //             'qty' => $key['deliv_qty'] * -1,
    //           ]);
    //           DB::commit();
    //       }
    
    //       MaterialTransferShipmentRelationship::create([
    //         'shipment_id' => $shipmentId,
    //         'material_transfer_id' => $mt['id']
    //       ]);
    //       DB::commit();
    //       return;

    //     case 3:

    //       DB::beginTransaction();

    //       //check if this shipment already issued or the quantity is enough
    //       $mtsr = MaterialTransferShipmentRelationship::where('shipment_id', $param['shipment_id'])->get();
    
    //       if (count($mtsr)) {
    //         //check if the quantity is below
    //         return response()->json([
    //           'success' => false,
    //           'message' => 'sorry, you cannot issued twice'
    //         ]);
    //       }

    //       /// Initial
    //       $to_facility_id = 19; // Production
    //       $from_facility_id = null; // WIP
    //       $date = date("Y-m-d");
    //       $prep = [
    //         'to_facility_id' => $to_facility_id,
    //         'from_facility_id' => $from_facility_id,
    //         'est_transfer_date' => $date,
    //         'user_id' => $userId,
    //         'description' => 'Automatically Generated by System'
    //       ];
    
    //       $mt = MaterialTransfer::create($prep);

    //       $prep = [
    //         'to_facility_id' => $to_facility_id, // WIP
    //         'from_facility_id' => $from_facility_id,
    //         'est_transfer_date' => $date,
    //         'user_id' => $userId,
    //         'description' => 'Automatically Generated by System'
    //       ];
    
    //       $mt = MaterialTransfer::create($prep);

    //       DB::commit();
    
    //       foreach ($items as $key) {
    //         $_temp = [
    //           'material_transfer_id' => $mt['id'],
    //           'product_id' => $key['product_id'],
    //           'product_feature_id' => $key['product_feature_id'],
    //           'transfer_qty' => $key['deliv_qty']
    //         ];
    
    //         $mti = MaterialTransferItem::create($_temp);
    //         DB::commit();
    
    //         $mtr = MaterialTransferRealisation::create([
    //           'material_transfer_id' => $mt['id'],
    //           'material_transfer_item_id' => $mti['id'],
    //           'transferred_qty' => $key['deliv_qty']
    //         ]);
    //         DB::commit();
    
    //         // substract qty from from_facility_id and make record on goods movement
    //         GoodsMovement::create([
    //           'date' => $date,
    //           'material_transfer_id' => $mt['id'],
    //           'material_transfer_item_id' => $mti['id'],
    //           'material_transfer_item_realisation_id' => $mtr['id'],
    //           'facility_id' => $to_facility_id,
    //           'goods_id' => $key['goods_id'],
    //           'product_id' => $key['product_id'],
    //           'product_feature_id' => $key['product_feature_id'],
    //           'type_movement' => 2, // 1 for incoming and 2 outbound
    //           'qty' => $key['deliv_qty'],
    //         ]);
    //         DB::commit();
    //       }
    //       return true;
        
    //     default:
    //       return false;
    //   }
    // } catch (\Throwable $err) {
    //   DB::rollback();
    //   return response()->json([
    //     'success' => false,
    //     'errors' => $th->getMessage()
    //   ], 500);
    // }
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
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
    return response()->json(['data' => $query]);
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
      DB::beginTransaction();

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
      DB::commit();

      $payloadShipmentStatus = [
        'shipment_type_status_id' => 3,
        'shipment_id' => $shipment_creation['id'],
        'user_id' => $userId
      ];

      ShipmentStatus::create($payloadShipmentStatus);
      DB::commit();

      $order_to_shipment_item = [];

      foreach ($orderItem as $item) {
        array_push($order_to_shipment_item, [
          'shipment_id' => $shipment_creation['id'],
          'order_item_id' => $item['id'],
          'qty' => $item->qty,
          'qty_shipped' => 0,
          'description' => $item['description']
        ]);
      }

      ShipmentItem::insert($order_to_shipment_item);
      DB::commit();
    } catch (\Throwable $th) {
      DB::rollback();
      return response()->json([
        'success' => false,
        'message' => $th->getMessage()
      ], 500);
    }

    return response()->json([
      'success' => true,
      'title' => 'The Incoming Shipment',
      'message' => 'The Shipment has been created #' . $shipment_creation->id,
      'link' => '/shipment/incoming/' . $shipment_creation->id
    ], 200);
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
