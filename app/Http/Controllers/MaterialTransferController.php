<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\Inventory\Inventory;
use App\Models\Inventory\MaterialTransfer;
use App\Models\Inventory\MaterialTransferItem;
use App\Models\Inventory\MaterialTransferRealisation;
use App\Models\Inventory\MaterialTransferStatus;
use App\Models\Inventory\GoodsMovement;
use App\Models\Product\Goods;
use App\Models\Product\Product;
use Exception;

class MaterialTransferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $query = MaterialTransfer::with('status', 'items', 'realisation', 'from_facility', 'to_facility', 'user')
                ->orderBy('id', 'desc')
                ->get()
                ->map(function ($item, $index) {
                    $product = count($item->items) ? $item->items[0]->product : null;
                    $goods = $product ? $product->goods : null;
                    $username = $item->user ? $item->user->name : 'none';

                    return [
                        'id' => $item->id,
                        'user' => $username,
                        'status' => count($item->status) ? $item->status[0]->status : 'None',
                        'mt_id' => 'MT-00' . $item->id,
                        'date' => $item->created_at,
                        'from_facility_name' => $item->from_facility_id,
                        'to_facility_id' => $item->to_facility_id,
                        'from_facility_name' => $item->from_facility->name,
                        'to_facility_name' => $item->to_facility->name,
                        'req_transfer_qty' => $item->items->sum('transfer_qty'),
                        'res_transfer_qty' => $item->realisation->sum('transferred_qty'),
                        'unit_measurement' => $goods ? $goods->satuan : null,
                        'est_transfer_date' => date_format(date_create($item->est_transfer_date), 'd-m-Y'),
                        'created_at' => $item->created_at,
                        'updated_at' => $item->updated_at
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
        ]);
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
            $_main = MaterialTransfer::create([
                'to_facility_id' => $param['to_facility_id'],
                'from_facility_id' => $param['from_facility_id'],
                'est_transfer_date' => $param['est_transfer_date'],
                'user_id' => $param['user_id'],
                'description' => $param['description']
            ]);

            $_data = [];
            foreach ($param['items'] as $key) {
                $_item_costing_id = isset($key['costing_item_id']) ? $key['costing_item_id'] : NULL;
                array_push($_data, [
                    'material_transfer_id' => $_main['id'],
                    'costing_item_id' => $key['costing_item_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'transfer_qty' => $key['qty'],
                    'costing_item_id' => $_item_costing_id
                ]);
            }

            MaterialTransferItem::insert($_data);
            DB::commit();

            MaterialTransferStatus::create([
                'material_transfer_id' => $_main['id'],
                'status' => 1
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'title' => 'Material Transfer Creation',
            'message' => 'The new Material Transfer Request has been created #' . $_main->id,
            'link' => '/inventory/material-transfer/' . $_main->id,
        ], 200);
    }

    /**
     * Confirmation for Material Transfer
     * 
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function confirmation_material_tranfer(Request $request)
    {
        $param = $request->all()['payload'];

        try {

            foreach ($param as $key) {

                $_item_costing_id = isset($key['costing_item_id']) ? $key['costing_item_id'] : NULL;

                $mtr = MaterialTransferRealisation::create([
                    'material_transfer_id' => $key['material_transfer_id'],
                    'material_transfer_item_id' => $key['material_transfer_item_id'],
                    'costing_item_id' => $_item_costing_id,
                    'transferred_qty' => $key['transferred_qty']
                ]);

                if (!isset($mtr->id)) throw new Error('fuck');
                if (!isset($key['material_transfer_id'])) throw new Error('fuck');

                // substract qty from from_facility_id and make record on goods movement
                GoodsMovement::create([
                    'date' => $key['date'],
                    'material_transfer_id' => $mtr['material_transfer_id'],
                    'material_transfer_item_id' => $key['material_transfer_item_id'],
                    'material_transfer_item_realisation_id' => $mtr['id'],
                    'facility_id' => $key['from_facility_id'],
                    'goods_id' => $key['goods_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'type_movement' => 2, // 1 for incoming and 2 outbound
                    'qty' => $key['transferred_qty'] * -1,
                ]);

                //add qty from to_facility_id and make record on goods_movement;
                GoodsMovement::create([
                    'date' => $key['date'],
                    'material_transfer_id' => $key['material_transfer_id'],
                    'material_transfer_item_id' => $key['material_transfer_item_id'],
                    'material_transfer_item_realisation_id' => $mtr->id,
                    'facility_id' => $key['to_facility_id'],
                    'goods_id' => $key['goods_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'type_movement' => 1, // 1 for incoming and 2 outbound
                    'qty' => $key['transferred_qty']
                ]);
            }

            // change status of material transfer id;
            MaterialTransferStatus::create([
                'material_transfer_id' => $param[0]['material_transfer_id'],
                'status' => 2
            ]);

            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'title' => 'The Material Transfer #' . $param[0]['material_transfer_id'] . ' Request',
            'message' => 'The Material Transfer Request has been filled on #' . $param[0]['material_transfer_id'],
            'link' => '/inventory/material-transfer/' . $param[0]['material_transfer_id']
        ], 200);
    }

    public function submit_and_confirmation(Request $request)
    {
        $param = $request->all()['payload'];

        try {
            DB::beginTransaction();
            $_mt = MaterialTransfer::create([
                'to_facility_id' => $param['to_facility_id'],
                'from_facility_id' => $param['from_facility_id'],
                'est_transfer_date' => $param['est_transfer_date'],
                'user_id' => $param['user_id'],
                'description' => $param['description']
            ]);
            DB::commit();

            $_data = [];
            foreach ($param['items'] as $key) {
                $_mti = MaterialTransferItem::create([
                    'material_transfer_id' => $_mt['id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'transfer_qty' => $key['qty']
                ]);
                DB::commit();

                $mtr = MaterialTransferRealisation::create([
                    'material_transfer_id' => $_mt['id'],
                    'material_transfer_item_id' => $_mti['id'],
                    'transferred_qty' => $key['qty']
                ]);
                DB::commit();

                $goods = Product::where('id', $key['product_id'])->first();

                if (!isset($mtr->id)) throw new Exception('Cannot find material transfer realisation');
                if (!isset($_mt->id)) throw new Exception('Cannot find material transfer');

                // substract qty from from_facility_id and make record on goods movement
                GoodsMovement::create([
                    'date' => $param['est_transfer_date'],
                    'material_transfer_id' => $_mt['id'],
                    'material_transfer_item_id' => $_mti['id'],
                    'material_transfer_item_realisation_id' => $mtr['id'],
                    'facility_id' => $param['from_facility_id'],
                    'goods_id' => $goods['goods_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'type_movement' => 2, // 1 for incoming and 2 outbound
                    'qty' => $key['qty'] * -1,
                ]);
                DB::commit();

                //add qty from to_facility_id and make record on goods_movement;
                GoodsMovement::create([
                    'date' => $param['est_transfer_date'],
                    'material_transfer_id' => $_mt['id'],
                    'material_transfer_item_id' => $_mti['id'],
                    'material_transfer_item_realisation_id' => $mtr['id'],
                    'facility_id' => $param['to_facility_id'],
                    'goods_id' => $goods['goods_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'type_movement' => 1, // 1 for incoming and 2 outbound
                    'qty' => $key['qty']
                ]);
                DB::commit();
            }

            MaterialTransferStatus::create([
                'material_transfer_id' => $_mt['id'],
                'status' => 1
            ]);
            DB::commit();

            MaterialTransferStatus::create([
                'material_transfer_id' => $_mt['id'],
                'status' => 2
            ]);
            DB::commit();

        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'title' => 'Material Transfer Creation',
            'message' => 'The new Material Transfer Request has been created #' . $_mt->id,
            'link' => '/inventory/material-transfer/' . $_mt->id,
        ], 200);
    }

    /**
     * Show a resource
     * 
     * @param Interger $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $query = MaterialTransfer::where('id', $id)
                ->with(['items' => function ($query) {
                    return $query->with('product', 'product_feature', 'transferred');
                }])
                ->with('status', 'to_facility', 'from_facility')
                ->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response() - json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query[0]
        ]);
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
            MaterialTransfer::update($param)->where('$id');
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Create new Status on Material Transfer Request
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function new_material_transfer_update_status()
    {
        $param = $request->all()['payload'];

        try {
            $_query_status = MaterialTransferStatus::create([
                'material_transfer_id' => $_main['id'],
                'status' => $param['status']
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
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
        $param = $request->all()['payload'];

        try {
            MaterialTransfer::find($id)->destroy();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'successs' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
