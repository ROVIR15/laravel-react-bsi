<?php

namespace App\Http\Controllers\V2\Inventory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Inventory\GoodsMovement;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;
// use Illuminate\Support\Facades\DB;
use DB;

class InventoryController extends Controller
{
    //

    public function stock_based_on_facility(Request $request)
    {
        $facilityId = $request->query('facility');

        try {

            $query = GoodsMovement::select('id', DB::raw('sum(qty) as current_stock'), 'product_id', 'goods_id', 'product_feature_id', 'import_flag', 'facility_id')
                ->with('product', 'product_feature', 'goods', 'product_category', 'facility')
                ->where('facility_id', $facilityId)
                // ->whereIn('product_id', $query)
                ->groupBy('product_feature_id', 'import_flag', 'facility_id')
                ->get()
                ->map(function ($query) {
                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $query['product'] ? $query['product'] : null;
                    $goods = $query->goods ? $query->goods : null;

                    $import_flag = $query->import_flag ? 2 : 1;

                    return
                        [
                            'id' => $query->id,
                            // 'sku_id_alt' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT) . '-' . $query->facility_id,
                            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                            'import_flag' => $import_flag,
                            'import_flag' => $query->import_flag === 1 ? 'Lokal' : 'Impor',
                            'goods_id' => $goods->id,
                            'product_id' => $product->id,
                            'product_feature_id' => $product_feature->id,
                            'item_name' => $goods ? $goods->name . ' - ' . $product_feature->color . ' ' . $product_feature->size : null,
                            'unit_measurement' => $goods ? $goods->satuan : null,
                            'order_item_id' => null,
                            // 'brand' => $goods ? $goods->brand : null,
                            'facility_id' => $query->facility_id,
                            'facility_name' => $query->facility->name,
                            'category_id' => $query->product_category->product_category_id,
                            'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                            'current_stock' => $query->current_stock,
                            'qty' => $query->current_stock
                        ];
                })
                ->filter(function ($item) {
                    return $item['current_stock'] >= 0;
                })
                ->values();
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

    public function get_order_item_by_check_availabiality_from_facility($order_id)
    {
        try {
            $query = OrderItem::with('product_feature')
                ->where('order_id', $order_id)
                ->whereHas('gmovement', function ($query) {
                    return $query->select(DB::raw('id, product_feature_id, product_id, order_item_id, sum(qty) as qty'))
                        ->groupBy('order_item_id')
                        ->where('facility_id', 23)
                        // ->where('qty', '>', 0);
                        ->having(DB::raw('sum(qty)'), '>', 0);
                })
                ->get()
                ->map(function ($query) {
                    $productFeature = $query->product_feature;
                    $productCategory = $productFeature ? $productFeature->product_category : null;
                    $product = $productFeature ? $productFeature->product : null;
                    $goods = $product ? $product->goods : null;

                    return [
                        'id' => $query['id'],
                        'import_flag' => 0, // means its all local
                        'sku_id' => str_pad(1, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
                        'order_item_id' => $query['id'],
                        'order_id' => $query['order_id'],
                        'product_feature_id' => $productFeature['id'],
                        'product_id' => $product['id'],
                        'goods_id' => $goods['id'],
                        'facility_id' => 23,
                        'facility_name' => 'Penyimpanan Subkontrak',
                        'qty' => $query['qty'],
                        'unit_measurement' => $goods ? $goods->satuan : null,
                        'category_id' => $productCategory ? $productCategory->category->id : null,
                        'category_name' => $productCategory ? $productCategory->category->name . ' - ' . $productCategory->category->sub->name : null,
                        'category' => $productCategory ? $productCategory->category->name . ' - ' . $productCategory->category->sub->name : null,
                        'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                        'name' => $goods ? $goods->name : null,
                        'size' => $productFeature ? $productFeature->size : null,
                        'color' => $productFeature ? $productFeature->color : null
                    ];
                });

            // foreach ($query as $item) {
            //   array_push($list, $item['product_feature_id']);
            // }      
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
