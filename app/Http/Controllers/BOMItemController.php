<?php

namespace App\Http\Controllers;


use Carbon\Carbon;

use App\Models\Manufacture\BOM;
use App\Models\Manufacture\BOMItem;

use App\Http\Resources\Manufacture\BOMItem as BOMItemOneCollection;
use App\Http\Resources\Manufacture\BOMItemCollection;
use App\Models\Inventory\GoodsMovement;
use App\Models\Manufacture\CostingItemRevised;
use App\Models\Order\OrderItem;
use App\Models\Product\ProductFeature;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BOMItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = BOMItem::with('product_feature')->get();

        return new BOMItemCollection($query);
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

    public function getCostingId()
    {
        try {
            $query = BOM::select('id', 'name')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'order_id' => $item->id,
                    'name' => $item->id . '-' . $item->name,
                    'po_number' => $item->id . '-' . $item->name
                ];
            });
        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'error' => $th->getMessage()()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
    }

    public function findItemOrderItemCostingId($costing_id)
    {
        try {
            $item = BOMItem::select('id')
                ->where('bom_id', $costing_id)
                ->whereHas('order_item')
                ->get()
                ->map(function ($item) {
                    return $item->id;
                });

            $__ss = BOMItem::select('id', 'bom_id', 'product_id', 'product_feature_id', 'consumption')
                ->with('costing')
                ->where('bom_id', $costing_id)
                ->doesntHave('order_item')
                ->get()
                ->map(function ($item) {
                    $productFeature = $item->product_feature ? $item->product_feature : null;
                    $product = $productFeature ? $productFeature->product : null;
                    $goods = $product ? $product->goods : null;
                    $costing = $costing_item ? $costing_item->costing : null;

                    return [
                        'id' => $index + 1,
                        'costing_item_id' => $costing_item ? $costing_item->id : null,
                        'product_id' => $product ? $product->id : null,
                        'product_feature_id' => $productFeature ? $productFeature->id : null,
                        'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                        'total_qty_received' => 0,
                        'qty_order' => 0,
                        'shipment_date' => null,
                        'consumption' => $item->consumption,
                        'purchase_order_id' => null,
                        'order_id' => null,
                        'po_number' => null,
                        'supplier_name' => null,
                        'costing_qty' => $costing ? $costing->qty : null,
                        'total_consumption_qty' => 0
                    ];
                });

            $query = OrderItem::select(
                'id',
                'order_id',
                'product_feature_id',
                'product_id',
                'costing_item_id',
                'shipment_estimated',
                DB::raw('sum(qty) as qty, unit_price')
            )
                ->whereIn('costing_item_id', $item)
                ->with('costing_item', 'check_shipment', 'product_feature')
                ->with(['order' => function ($query) {
                    return $query->with('purchase_order');
                }])
                ->groupBy('product_feature_id')
                ->get()
                ->map(function ($item, $index) {
                    $productFeature = $item->product_feature ? $item->product_feature : null;
                    $product = $productFeature ? $productFeature->product : null;
                    $goods = $product ? $product->goods : null;
                    $order = $item->order ? $item->order : null;
                    $purchaseOrder = $order ? $order->purchase_order : null;
                    $bought_from = $purchaseOrder->party ? $purchaseOrder->party : null;
                    $costing_item = $item->costing_item ? $item->costing_item : null;
                    $costing = $costing_item ? $costing_item->costing : null;
                    $check_shipment = count($item->check_shipment) ? $item->check_shipment[0] : null;

                    $consumption = $costing_item ? $costing_item->consumption : 0;
                    $costing_qty = $costing ? $costing->qty : 0;

                    return [
                        'id' => $index + 1,
                        'costing_item_id' => $costing_item ? $costing_item->id : null,
                        'product_id' => $product ? $product->id : null,
                        'product_feature_id' => $productFeature ? $productFeature->id : null,
                        'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                        'total_qty_received' => $check_shipment ? $check_shipment->total_qty_received : 0,
                        'qty_order' => $item->qty,
                        'shipment_date' => $item->shipment_estimated,
                        'consumption' => $costing_item ? $costing_item->consumption : null,
                        'purchase_order_id' => $purchaseOrder->id,
                        'order_id' => $order->id,
                        'po_number' => $purchaseOrder ? $purchaseOrder->po_number : null,
                        'supplier_name' => $bought_from ? $bought_from->name : null,
                        'costing_qty' => $costing ? $costing->qty : null,
                        'total_consumption_qty' => $consumption * $costing_qty
                    ];
                });
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $__ss
        ]);
    }

    public function findItemsByCostingId($costing_id)
    {

        try {
            $query = BOMItem::with('product_feature')->where('bom_id', $costing_id)->get()->map(function ($data) {
                $query2 = ProductFeature::select('product_id', 'id')
                    ->where('id', $data['product_feature_id'])
                    ->get();

                if ($data['product_id'] === 0) {
                    BOMItem::where('id', $data['id'])->update(['product_id' => $query2[0]['product_id']]);
                    $status = 'updated product id on costing item';
                }

                return $query2[0]['product_id'];
            });

            $items = ProductFeature::with('product', 'product_category')->whereIn('product_id', $query)->get()->map(function ($query) use ($costing_id) {
                $product = $query->product ? $query->product : null;
                $goods = $product ? $product->goods : null;

                $query3 = BOMItem::select('unit_price', 'qty', 'consumption', 'bom_id', 'id as costing_item_id')
                    ->with(['costing' => function ($item) {
                        return $item->with('currency_info');
                    }])
                    ->where('bom_id', $costing_id)
                    ->where('product_id', $query->product_id)
                    ->get();

                $costing_item = count($query3) ? $query3[0] : null;
                $costing = !is_null($costing_item) ? $costing_item['costing'] : null;

                $qty = 0;
                $unit_price = 0;

                if (!is_null($costing_item)) {
                    $unit_price = $costing_item['unit_price'];
                    if (!is_null($costing)) {
                        $qty = $costing_item['consumption'] * $costing['qty'];
                    }
                }

                return
                    [
                        'id' => $query['id'],
                        'product_id' => $query['product_id'],
                        'product_feature_id' => $query['id'],
                        'item_name' => $goods ? $goods->name . ' - ' . $query->color . ' ' . $query->size : null,
                        'unit_measurement' => $goods ? $goods->satuan : null,
                        'brand' => $goods ? $goods->brand : null,
                        'category_id' => $query->product_category->product_category_id,
                        'category_name' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                        'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                        'qty' => $qty,
                        'unit_price' => $unit_price,
                        'currency_id' => count($query3) ? $query3[0]['costing']['currency_id'] : null,
                        'costing_item_id' => count($query3) ? $query3[0]['costing_item_id'] : 0
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
            'data' => $items
        ], 200);
    }

    public function findItemsByCostingId_test($costing_id, Request $request)
    {
        $from_facility = $request->query('from_facility');
        try {
            $query = BOMItem::with('product_feature')->where('bom_id', $costing_id)->get()->map(function ($data) {
                $query2 = ProductFeature::select('product_id', 'id')
                    ->where('id', $data['product_feature_id'])
                    ->get();

                if ($data['product_id'] === 0) {
                    BOMItem::where('id', $data['id'])->update(['product_id' => $query2[0]['product_id']]);
                    $status = 'updated product id on costing item';
                }

                return $query2[0]['product_id'];
            });

            $items = GoodsMovement::select('id', 'product_id', 'order_item_id', 'goods_id', 'product_feature_id', 'import_flag', 'facility_id')
                ->with('product', 'product_feature', 'goods', 'product_category', 'facility')
                ->where('facility_id', $from_facility)
                ->whereIn('product_id', $query)
                ->groupBy('product_feature_id', 'import_flag', 'facility_id')
                ->get()
                ->map(function ($query) use ($costing_id) {
                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $query['product'] ? $query['product'] : null;
                    $goods = $query->goods ? $query->goods : null;

                    $query3 = BOMItem::select('unit_price', 'id as costing_item_id')->where('bom_id', $costing_id)->where('product_id', $query->product_id)->get();
                    $doc_import = $query->import_flag;
                    $import_flag = 1;
                        
                    if ($doc_import === 1) {
                        $import_flag = 2;
                    } elseif ($doc_import === 2) {
                        $import_flag = 3;
                    } else {
                        $import_flag = 1;
                    }

                    return
                        [
                            'id' => $query->id,
                            'sku_id_alt' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT) . '-' . $query->facility_id,
                            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                            'import_flag' => $query->import_flag,
                            'order_item_id' => $query->order_item_id,
                            'product_id' => $product->id,
                            'product_feature_id' => $product_feature->id,
                            'item_name' => $goods ? $goods->name . ' - ' . $product_feature->color . ' ' . $product_feature->size : null,
                            'unit_measurement' => $goods ? $goods->satuan : null,
                            'brand' => $goods ? $goods->brand : null,
                            'facility_id' => $query->facility_id,
                            'facility_name' => $query->facility->name,
                            'category_id' => $query->product_category->product_category_id,
                            'category_name' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                            'unit_price' => count($query3) ? $query3[0]['unit_price'] : 0,
                            'costing_item_id' => count($query3) ? $query3[0]['costing_item_id'] : 0
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
            'data' => $items
        ], 200);
    }

    public function findItemsByCostingIdWithStock_test($costing_id, Request $request)
    {

        $from_facility = $request->query('from_facility');
        $_param = is_null($from_facility) ? 3 : $from_facility;

        try {
            if(!$costing_id) {
                throw new Exception('Cannot send null id');
            }

            $query = [];

            $query = BOMItem::with('product_feature')->where('bom_id', $costing_id)->get()->map(function ($data) {
                $query2 = ProductFeature::select('product_id', 'id')
                    ->where('id', $data['product_feature_id'])
                    ->get();

                if ($data['product_id'] === 0) {
                    BOMItem::where('id', $data['id'])->update(['product_id' => $query2[0]['product_id']]);
                    $status = 'updated product id on costing item';
                }

                return $query2[0]['product_id'];
            })->toArray();

            $bom = BOM::find($costing_id);

            if($bom){
                $product_id = $bom->product_id;
                array_push($query, $product_id);
            }

            $items = GoodsMovement::select(DB::raw('id, sum(qty) as available_stock'), 'product_id', 'goods_id', 'product_feature_id', 'order_item_id', 'import_flag')
                ->with('product', 'product_feature', 'goods', 'product_category')
                ->whereIn('product_id', $query)
                ->where('facility_id', $from_facility)
                ->groupBy('order_item_id', 'product_feature_id', 'import_flag')
                ->get()
                ->map(function ($query) use ($costing_id) {
                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $query['product'] ? $query['product'] : null;
                    $goods = $query->goods ? $query->goods : null;

                    $query3 = BOMItem::select('unit_price', 'id as costing_item_id')->where('bom_id', $costing_id)->where('product_id', $query->product_id)->get();
                    $doc_import = $query->import_flag;
                    $import_flag = 1;
                        
                    if ($doc_import === 1) {
                        $import_flag = 2;
                    } elseif ($doc_import === 2) {
                        $import_flag = 3;
                    } else {
                        $import_flag = 1;
                    }

                    return
                        [
                            'id' => $query->id,
                            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                            'import_flag' => $query->import_flag,
                            'order_item_id' => $query->order_item_id,
                            'product_id' => $product->id,
                            'product_feature_id' => $product_feature->id,
                            'item_name' => $goods ? $goods->name . ' - ' . $product_feature->color . ' ' . $product_feature->size : null,
                            'unit_measurement' => $goods ? $goods->satuan : null,
                            'brand' => $goods ? $goods->brand : null,
                            'category_id' => $query->product_category->product_category_id,
                            'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                            'unit_price' => count($query3) ? $query3[0]['unit_price'] : 0,
                            'current_stock' => $query->available_stock,
                            'costing_item_id' => count($query3) ? $query3[0]['costing_item_id'] : 0
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
            'data' => $items
        ], 200);
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
        $current_date_time = Carbon::now()->toDateTimeString();

        try {

            $bomItemsCreation = [];

            foreach ($param as $key) {
                array_push($bomItemsCreation, [
                    'bom_id' => $key['bom_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'qty' => $key['qty'],
                    'created_at' => $current_date_time
                ]);
            }

            BOMItem::insert($bomItemsCreation);
        } catch (Exception $e) {
            //throw $th;
            return response()->json(
                [
                    'success' => false,
                    'errors' => $e->getMessage()
                ],
                500
            );
        }

        return response()->json(
            [
                'success' => true
            ],
            200
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($bomId)
    {
        try {
            //code...
            $query = BOMItem::with('product_feature')->where('bom_id', $bomId)->get();
            return new BOMItemCollection($query);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
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
            $query_item = BOMItem::find($id);

            CostingItemRevised::create([
                'costing_id' => $query_item['bom_id'],
                'costing_item_id' => $id,
                'product_id' => $query_item['product_id'],
                'product_feature_id' => $query_item['product_feature_id'],
                'qty' => $query_item['qty'],
                'consumption' => $query_item['consumption'],
                'allowance' => $query_item['allowance'],
                'unit_price' => $query_item['unit_price']
            ]);

            BOMItem::find($id)->update($param);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
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
        try {
            BOMItem::find($id)->delete();
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
            ]);
        }
        return response()->json([
            'success' => true
        ]);
    }
}
