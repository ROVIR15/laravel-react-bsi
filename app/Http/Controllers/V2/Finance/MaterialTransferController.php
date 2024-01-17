<?php

namespace App\Http\Controllers\V2\Finance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Inventory\MaterialTransfer;
use App\Models\Inventory\MaterialTransferItem;
use App\Models\Facility\Facility;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;

class MaterialTransferController extends Controller
{
    //
    public function index(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');
        $paginate = $request->query('paginate');

        $from_facility = $request->query('from_facility');
        $to_facility = $request->query('to_facility');

        try {
            $query = MaterialTransfer::with('to_facility', 'from_facility', 'status', 'user', 'relation_to_shipment')
                ->whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->where('from_facility_id', $from_facility)
                ->where('to_facility_id', $to_facility)
                ->where('from_facility_id', '!=', 16)
                ->where('to_facility_id', '!=', 3)
                ->paginate($paginate)
                ->map(function ($query) {
                    return [
                        'id' => $query->id,
                        'material_transfer_uid' => 'MT-' . str_pad($query->id, 4, "0", STR_PAD_LEFT),
                        'to_facility_id' => $query->to_facility_id,
                        'to_facility_name' => $query->to_facility ? $query->to_facility['name'] : null,
                        'from_facility_id' => $query->from_facility_id,
                        'from_facility_name' => $query->from_facility ? $query->from_facility['name'] : null,
                        'user' => $query->user ? $query->user['name'] : null,
                        'created_at' => $query->created_at,
                        'mtr' => $query->relation_to_shipment
                    ];
                });
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => 'Error processing this data'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }

    public function items($id)
    {
        try {
            $query = MaterialTransferItem::with('transferred', 'product', 'product_feature')
                ->where('material_transfer_id', $id)
                ->get()
                ->map(function ($query, $index) {
                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $product_feature->product ? $product_feature->product : null;
                    $goods = $product->goods ? $product->goods : null;

                    $order_item_id = $query->order_item_id ? $query->order_item_id : null;

                    $item_name = '';
                    $order_item = null;
                    if (!is_null($product_feature) && !is_null($product) & !is_null($goods)) {
                        $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;
                    }

                    $import_flag = 1;

                    if (!is_null($order_item_id)) {
                        $order_item = OrderItem::find($order_item_id);

                        if ($order_item) {
                            $order = Order::find($order_item->order_id);
                            if (!is_null($order)) {
                                $import_flag = $order->import_flag ? 2 : 1;
                            }

                            $import_flag = $order->import_flag ? 2 : 1;
                        }
                    }


                    $realisation = count($query->transferred) ? $query->transferred[0] : null;

                    return [
                        'id' => $query->id,
                        'material_transfer_item_uid' => 'MT-' . str_pad($query->material_transfer_id, 4, "0", STR_PAD_LEFT) . '-' . str_pad($index + 1, 2, "0", STR_PAD_LEFT),
                        'material_transfer_id' => $query->material_transfer_id,
                        'material_transfer_name' => 'MT-' . str_pad($query->material_transfer_id, 4, "0", STR_PAD_LEFT),
                        'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                        'item_name' => $item_name,
                        'req_transfer_qty' => $query->transfer_qty,
                        'filled_transfer_qty' => !is_null($realisation) ? $realisation->transferred_qty : 0,
                        'unit_price' => !is_null($order_item) ? $order_item->unit_price : 0
                    ];
                });

            if (!count($query)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Not Found!'
                ], 404);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }

    public function items_filter_by_query_month_based(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');

        $from_facility = $request->query('from_facility');

        $to_facility = $request->query('to_facility');

        try {
            $query = MaterialTransferItem::with('transferred', 'product', 'product_feature')
                ->with(['doc' => function ($query) {
                    return $query->with('to_facility', 'from_facility');
                }])
                ->whereHas('doc', function ($query) use ($month, $year, $from_facility, $to_facility) {
                    return $query
                        ->whereMonth('created_at', $month)
                        ->whereYear('created_at', $year)
                        // ->where('from_facility_id', $from_facility)
                        // ->where('to_facility_id', $to_facility)
                        ->where('from_facility_id', '!=', 16)
                        ->where('to_facility_id', '!=', 3);
                })
                ->get()
                ->map(function ($query, $index) {
                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $product_feature->product ? $product_feature->product : null;
                    $goods = $product->goods ? $product->goods : null;

                    $order_item_id = $query->order_item_id ? $query->order_item_id : null;

                    $item_name = '';
                    $order_item = null;
                    if (!is_null($product_feature) && !is_null($product) & !is_null($goods)) {
                        $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;
                    }

                    $import_flag = 1;

                    if (!is_null($order_item_id)) {
                        $order_item = OrderItem::find($order_item_id);

                        if ($order_item) {
                            $order = Order::find($order_item->order_id);
                            if (!is_null($order)) {
                                $import_flag = $order->import_flag ? 2 : 1;
                            }

                            $import_flag = $order->import_flag ? 2 : 1;
                        }
                    }

                    $realisation = count($query->transferred) ? $query->transferred[0] : null;

                    $doc_mtr = $query->doc;

                    $date_creation = date_create($doc_mtr->created_at);

                    return [
                        'id' => $query->id,
                        'material_transfer_item_uid' => 'MT-' . str_pad($query->material_transfer_id, 4, "0", STR_PAD_LEFT) . '-' . str_pad($index + 1, 2, "0", STR_PAD_LEFT),
                        'date' => date_format($date_creation, 'd M Y'),
                        'material_transfer_id' => $query->material_transfer_id,
                        'material_transfer_name' => 'MT-' . str_pad($query->material_transfer_id, 4, "0", STR_PAD_LEFT),
                        'to_facility_id' => $doc_mtr->to_facility_id,
                        'to_facility_name' => $doc_mtr->to_facility ? $doc_mtr->to_facility['name'] : null,
                        'from_facility_id' => $doc_mtr->from_facility_id,
                        'from_facility_name' => $doc_mtr->from_facility ? $doc_mtr->from_facility['name'] : null,
                        'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                        'item_name' => $item_name,
                        'req_transfer_qty' => $query->transfer_qty,
                        'filled_transfer_qty' => !is_null($realisation) ? $realisation->transferred_qty : 0,
                        'unit_price' => !is_null($order_item) ? $order_item->unit_price : 0
                    ];
                });

            if (!count($query)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Not Found!'
                ], 404);
            }
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }

    public function material_transfer_facility()
    {
        try {
            $query = Facility::all();
        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'success' => 'error',
                'message' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }
}
