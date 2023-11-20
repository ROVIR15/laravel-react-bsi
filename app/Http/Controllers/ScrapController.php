<?php

namespace App\Http\Controllers;

use App\Models\Inventory\GoodsMovement;
use App\Models\Inventory\MaterialTransfer;
use App\Models\Inventory\MaterialTransferItem;
use App\Models\Inventory\MaterialTransferRealisation;
use App\Models\Inventory\Scrap;
use App\Models\Inventory\ScrapItem;
use App\Models\Product\Goods;
use App\Models\Product\Product;
use App\Models\Product\ProductFeature;
use App\Models\Product\ProductHasCategory;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScrapController extends Controller
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
        try {
            //code...
            $query = Scrap::with('items')->orderBy('id', 'DESC')->get()->map(function ($query) {
                $arr = $query->items;

                return ([
                    'id' => $query->id,
                    'document_number' => $query->document_number,
                    'date' => $query->date,
                    'type' => 'BC 2.4',
                    'banyaknya' => $arr->count(),
                    'jumlah_barang' => $arr->sum('qty')
                ]);
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

    public function change_date_format($str)
    {
        setlocale(LC_TIME, 'id_ID');
        $timestamp = strtotime($str);
        $formatted_date = strftime('%e %B %Y', $timestamp);
        return $formatted_date;
    }

    public function reportScrap(Request $request)
    {
        $param = $request->all();

        $fromDate = $request->query('fromDate');
        $thruDate = $request->query('thruDate');

        if (empty($fromDate) || empty($thruDate)) {
            $thruDate = date('Y-m-d');
            $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
            $fromDate = date_format($fromDate, 'Y-m-d');
        }

        try {
            $query = ScrapItem::with('scrap', 'order_item', 'product_feature', 'product')
                ->whereHas('scrap', function ($query) use ($fromDate, $thruDate){
                    return $query
                    ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate]);
                })
                ->get()
                ->map(function ($item, $index) {
                    $productFeature = $item->product_feature;
                    $product = $item->product ? $item->product : null;
                    $goods = $product ? $product->goods : null;

                    return [
                        'id' => $index + 1,
                        'document_number' => $item->scrap['document_number'],
                        'document_date' => $this->change_date_format($item->scrap['date']),
                        'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                        'product_id' => $productFeature->product->id,
                        'product_feature_id' => $item->product_feature_id,
                        'goods_id' => $goods->id,
                        'order_id' => $item->order_id,
                        'order_item_id' => $item->order_item_id,
                        'unit_measurement' => $goods ? $goods->satuan : null,
                        'category' => 'Finished Goods',
                        'unit_price' => $item->order_item ? $item->order_item->unit_price : 0,
                        'qty' => $item->qty
                    ];
                });
        } catch (Exception $th) {
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
            DB::beginTransaction();

            $query = Scrap::create([
                'document_number' => $param['document_number'],
                'date' => $param['date']
            ]);
            DB::commit();

            $prep = [
                'to_facility_id' => 15,
                'from_facility_id' => 4,
                'est_transfer_date' => $param['date'],
                'user_id' => $param['user_id'],
                'description' => 'Automatically Generated by System'
            ];

            $mt = MaterialTransfer::create($prep);
            DB::commit();

            $__items = [];

            foreach ($param['items'] as $item) {
                $product_master = Product::find($item['product_id']);
                $goods_item = Goods::find($product_master['goods_id']);
                $product_variant = ProductFeature::find($item['product_feature_id']);

                $goods_scrap = Goods::create([
                    'name' => $goods_item['name'] . ' Scrap',
                    'satuan' => $item['unit_measurement'],
                    'value' => $goods_item['value'],
                    'brand' => $goods_item['brand'],
                    'imageUrl' => $goods_item['imageUrl']
                ]);

                $product_scrap = Product::create([
                    'goods_id' => $goods_scrap['id'],
                ]);
                DB::commit();

                ProductHasCategory::create([
                    'product_id' => $product_scrap['id'],
                    'product_category_id' => 10
                ]);
                DB::commit();

                $temp = [
                    'product_id' => $product_scrap['id'],
                    'color' => $product_variant['color'],
                    'size' => $product_variant['size']
                ];

                $product_variant_scrap = ProductFeature::create($temp);
                DB::commit();

                array_push($__items, [
                    'unit_measurement' => $item['unit_measurement'],
                    'product_id' => $product_scrap['id'],
                    'product_feature_id' => $product_variant_scrap['id'],
                    'order_id' => isset($item['order_id']) ? $item['order_id'] : null,
                    'order_item_id' => isset($item['order_item_id']) ? $item['order_item_id'] : null,
                    'qty' => $item['qty'],
                    'scrap_id' => $query->id
                ]);

                $_item_costing_id = isset($key['costing_item_id']) ? $key['costing_item_id'] : NULL;

                $_temp = [
                    'costing_item_id' => $_item_costing_id,
                    'material_transfer_id' => $mt['id'],
                    'product_id' => $product_scrap['id'],
                    'product_feature_id' => $product_variant_scrap['id'],
                    'transfer_qty' => $item['qty']
                ];

                $mti = MaterialTransferItem::create($_temp);
                DB::commit();

                $mtr = MaterialTransferRealisation::create([
                    'material_transfer_id' => $mt['id'],
                    'material_transfer_item_id' => $mti['id'],
                    'transferred_qty' => $item['qty'],
                    'costing_item_id' => $_item_costing_id
                ]);
                DB::commit();

                $goods = null;

                if (!isset($item['goods_id'])) {
                    $goods = Product::select('goods_id')->where('id', $item['product_id'])->get();
                    $goods = count($goods) ? $goods[0]->goods_id : 0;
                } else {
                    $goods = $item['goods_id'];
                }

                // substract qty from from_facility_id and make record on goods movement
                GoodsMovement::create([
                    'date' => $param['date'],
                    'material_transfer_id' => $mt['id'],
                    'material_transfer_item_id' => $mti['id'],
                    'material_transfer_item_realisation_id' => $mtr['id'],
                    'facility_id' => 4,
                    'goods_id' => $goods_scrap['id'],
                    'product_id' => $product_scrap['id'],
                    'product_feature_id' => $product_variant_scrap['id'],
                    'type_movement' => 2, // 1 for incoming and 2 outbound
                    'qty' => $item['qty'] * -1,
                ]);
                DB::commit();

                //add qty from to_facility_id and make record on goods_movement;
                GoodsMovement::create([
                    'date' => $param['date'],
                    'material_transfer_id' => $mt['id'],
                    'material_transfer_item_id' => $mti['id'],
                    'material_transfer_item_realisation_id' => $mtr['id'],
                    'facility_id' => 15,
                    'goods_id' => $goods_scrap['id'],
                    'product_id' => $product_scrap['id'],
                    'product_feature_id' => $product_variant_scrap['id'],
                    'type_movement' => 1, // 1 for incoming and 2 outbound
                    'qty' => $item['qty']
                ]);
                DB::commit();
            }

            ScrapItem::insert($__items);

            DB::commit();
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'errors' => $th->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true,
            'title' => 'Scrap Document Creation',
            'message' => 'The new scrap document has been created #' . $query->id,
            'link' => '/inventory/scrap-management' . $query->id,
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
            $query = Scrap::with(['items' => function ($query) {
                return $query->with('product_feature', 'product');
            }])->find($id);

            $items = $query->items->map(function ($query) {
                $productFeature = $query->product_feature;
                $product = $query->product ? $query->product : null;
                $goods = $product ? $product->goods : null;

                return [
                    'id' => $query->id,
                    'sku_id' => str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
                    'product_id' => $query->product_id,
                    'product_feature_id' => $query->product_feature_id,
                    'order_id' => $query->order_id,
                    'order_item_id' => $query->order_item_id,
                    'qty' => $query->qty,
                    'unit_measurement' => $goods->satuan,
                    'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                ];
            });

            $query2 = Scrap::find($id);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query2,
            'items' => $items
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
            Scrap::find($id)->update($param);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage()
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
            Scrap::find($id)->delete();
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
