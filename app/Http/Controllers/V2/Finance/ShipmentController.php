<?php

namespace App\Http\Controllers\V2\Finance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order\PurchaseOrder;
use App\Models\Order\SalesOrder;
use App\Models\Shipment\Shipment;
use App\Models\Shipment\ShipmentItem;

class ShipmentController extends Controller
{
    //
    public function index(Request $request)
    {
        $shipmentType = $request->query('shipment_type_id');
        $paginate = $request->query('paginate');
        $month = $request->query('month');
        $year = $request->query('year');

        try {
            $query = Shipment::where('shipment_type_id', $shipmentType)
                               ->whereMonth('delivery_date', $month)
                               ->whereYear('delivery_date', $year)
                               ->paginate($paginate)
                               ->map(function($item) {

                                    $num = str_pad($item->id, 4, "0", STR_PAD_LEFT);
                                    $ship_num = '';
                                    $order_num = '';

                                    if($item->shipment_type_id === 1) {
                                        $ship_num = 'INSHIP-' . $num;
                                        $purchase_order = PurchaseOrder::where('order_id', $item->order_id)->get();

                                        if($purchase_order) {
                                            $order_num = 'PO-' . str_pad($purchase_order[0]->id, 4, "0", STR_PAD_LEFT);
                                        } else {
                                            $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                                        }
                                    } else if ($item->shipment_type_id === 2) {
                                        $ship_num = 'OUTSHIP-' . $num;
                                        $sales_order = SalesOrder::where('order_id', $item->order_id)->get();

                                        if($sales_order) {
                                            $order_num = 'PO-' . str_pad($sales_order[0]->id, 4, "0", STR_PAD_LEFT);
                                        } else {
                                            $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                                        }
                                    } else if ($item->shipment_type_id === 3) {
                                        $ship_num = 'INSHIP-SC-' . $num;
                                        $purchase_order = PurchaseOrder::where('order_id', $item->order_id)->get();

                                        if($purchase_order) {
                                            $order_num = 'PO-' . str_pad($purchase_order[0]->id, 4, "0", STR_PAD_LEFT);
                                        } else {
                                            $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                                        }
                                    } else if ($item->shipment_type_id === 4) {
                                        $ship_num = 'OUTSHIP-SC-' . $num;
                                        $purchase_order = PurchaseOrder::where('order_id', $item->order_id)->get();

                                        if($purchase_order) {
                                            $order_num = 'PO-' . str_pad($purchase_order[0]->id, 4, "0", STR_PAD_LEFT);
                                        } else {
                                            $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                                        }
                                    } else {
                                        $ship_num = '';
                                    }
 
                                    return [
                                        'id' => $item->id,
                                        'ship_num' => $ship_num,
                                        'purchase_order_id' => $order_num,
                                        'order_id' => $item->order_id,
                                        'delivery_date' => $item->delivery_date,
                                        'subcontract' => $item->subcontract_flag === 0 ? 'Tidak Subkontrak' : 'Ya Subkontrak'
                                    ];
                               });

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'message' => 'Cannot find a shipment!',
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
    }

    public function items($id, Request $request)
    {
        try {
            $query = ShipmentItem::where('shipment_id', $id)
                     ->with('shipment', 'order_item')
                     ->get()
                     ->map(function($item, $index){
                        
                        $num = str_pad($item->id, 4, "0", STR_PAD_LEFT);
                        $ship_num = '';
                        $order_num = '';

                        if($item->shipment->shipment_type_id === 1) {
                            $ship_num = 'INSHIP-' . $num;
                            $purchase_order = PurchaseOrder::where('order_id', $item->shipment->order_id)->get();

                            if($purchase_order) {
                                $order_num = 'PO-' . str_pad($purchase_order[0]->id, 4, "0", STR_PAD_LEFT);
                            } else {
                                $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                            }
                        } else if ($item->shipment->shipment_type_id === 2) {
                            $ship_num = 'OUTSHIP-' . $num;
                            $sales_order = SalesOrder::where('order_id', $item->shipment->order_id)->get();

                            if($sales_order) {
                                $order_num = 'PO-' . str_pad($sales_order[0]->id, 4, "0", STR_PAD_LEFT);
                            } else {
                                $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                            }
                        } else if ($item->shipment->shipment_type_id === 3) {
                            $ship_num = 'INSHIP-SC-' . $num;
                            $purchase_order = PurchaseOrder::where('order_id', $item->shipment->order_id)->get();

                            if($purchase_order) {
                                $order_num = 'PO-' . str_pad($purchase_order[0]->id, 4, "0", STR_PAD_LEFT);
                            } else {
                                $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                            }
                        } else if ($item->shipment->shipment_type_id === 4) {
                            $ship_num = 'OUTSHIP-SC-' . $num;
                            $purchase_order = PurchaseOrder::where('order_id', $item->shipment->order_id)->get();

                            if($purchase_order) {
                                $order_num = 'PO-' . str_pad($purchase_order[0]->id, 4, "0", STR_PAD_LEFT);
                            } else {
                                $order_num = 'PO-' . str_pad(0, 4, "0", STR_PAD_LEFT);
                            }
                        } else {
                            $ship_num = '';
                        }

                        $orderItem = $item->order_item ? $item->order_item : null;

                        $product_feature = $orderItem->product_feature ? $orderItem->product_feature : null;
                        $product = $product_feature->product ? $product_feature->product : null;
                        $goods = $product->goods ? $product->goods : null;
    
                        $item_name = '';
                        if (!is_null($product_feature) && !is_null($product) & !is_null($goods)){
                            $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;                            
                        }
    
                        // $import_flag = 1;
                        // if (!is_null($order)){
                        //     $import_flag = $order->import_flag ? 2 : 1;
                        // }
    
                        // $import_flag = $order->import_flag ? 2 : 1;
                        $import_flag = 1;
    

                        return [
                            'id' => $item->id,
                            'shipment_uid' => $ship_num,
                            'shipment_item_uid' => $ship_num . '-' . str_pad($index+1, 2, '0', STR_PAD_LEFT),
                            'order_uid' => $order_num,
                            'order_item_id' => $item->order_item_id,
                            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                            'item_name' => $item_name,
                            'delivery_qty' => $item->qty,
                            'qty_on_hand' => $item->qty_shipped
                        ];
                     });

        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
    }
}
