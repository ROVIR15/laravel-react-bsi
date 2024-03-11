<?php

namespace App\Http\Controllers\V2\Finance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Order\PurchaseOrder;
use App\Models\Order\OrderItem;

class PurchaseOrderController extends Controller
{
    //

    public function index(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');

        try {
            $query = PurchaseOrder::with('order')
                ->whereMonth('created_at', '=', $month)
                ->whereYear('created_at', '=', $year)
                ->paginate(10)
                ->map(function ($query) {
                    // $costing= $query->order_item_one;
                    return [
                        'id' => $query->id,
                        'po_uid' => 'PO-' . str_pad($query->id, 4, "0", STR_PAD_LEFT),
                        'po_number' => $query->po_number,
                        'order_id' => $query->order_id,
                        'issue_date' => $query->issue_date,
                        'import_flag' => $query->import_flag,
                        // 's' => $costing
                    ];
                });
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

    public function items($id)
    {
        try {
            $query = OrderItem::with(['order' => function ($query) {
                return $query->with('purchase_order');
            }])
                ->with(['product_feature'])
                ->where('order_id', $id)
                ->get()
                ->map(function ($query, $index){
                    $order = $query->order ? $query->order : null;
                    $purchase_order = $order->purchase_order ? $order->purchase_order : null;

                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $product_feature->product ? $product_feature->product : null;
                    $goods = $product->goods ? $product->goods : null;

                    $item_name = '';
                    if (!is_null($product_feature) && !is_null($product) & !is_null($goods)){
                        $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;                            
                    }

                    $import_flag = 1;
                    if (!is_null($order)){
                        $import_flag = $order->import_flag ? 2 : 1;
                    }

                    // $import_flag = $order->import_flag ? 2 : 1;

                    $doc_import = $order->import_flag;
                    $import_flag = 1;
  
                    if ($doc_import === 1) {
                        $import_flag = 2;
                    } elseif ($doc_import === 2) {
                        $import_flag = 3;
                    } else {
                        $import_flag = 1;
                    }

                    return [
                        'id' => $query->id,
                        'po_uid' => 'PO-' . str_pad($purchase_order->id, 4, '0', STR_PAD_LEFT),
                        'po_item_uid' => 'PO-' . str_pad($purchase_order->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($index+1, 2, "0", STR_PAD_LEFT),
                        'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                        // 'product_id' => $product->id,
                        // 'goods_id' => $goods->id,
                        // 'product_feature_id' => $query->product_feature_id,
                        // 'order_id' => $purchase_order->order_id,
                        'purchase_order_id' => $purchase_order->id,
                        'ref_number' => $purchase_order->po_number,
                        'item_name' => $item_name,
                        'order_id' => $query->order->id,
                        'qty' => $query->qty,
                        'unit_price' => $query->unit_price,
                        'cm_price' => $query->cm_price,
                        'shipment_estimated' => $query->shipment_estimated
                    ];
                });

            if (count($query) === 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'No Items'
                ], 204);
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
}
