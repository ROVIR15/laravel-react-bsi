<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory\Adjustment;
use App\Models\Inventory\AdjustmentItem;
use App\Models\Inventory\GoodsMovement;
use Illuminate\Support\Facades\DB;

class AdjustmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // try {
        //     $query = Adjustment::with('facility', 'user')
        //              ->get();

        //              return response()->json([
        //                 'success' => true,
        //                 'data' => $query
        //             ]);

        // } catch (\Throwable $th) {
        //     //throw $th;
        //     return response()-json([
        //         'success' => false,
        //         'error' => $th->getMessage()
        //     ], 500);
        // }

        $query = Adjustment::with('facility', 'user')
            ->get();

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
            $_main = Adjustment::create([
                'user_id' => $param['user_id'],
                'facility_id' => $param['facility_id'],
                'change_type' => $param['adjustment_type'],
                'date' => $param['adjustment_date']
            ]);

            $_data = [];
            foreach ($param['items'] as $key) {
                AdjustmentItem::create([
                    'adjustment_id' => $_main['id'],
                    'import_flag' => $key['import_flag'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'initial_qty' => $key['current_qty'],
                    'changes' => $key['counted_qty']
                ]);
                DB::commit();

                $diff = $key['counted_qty'] - $key['current_qty'];
                $type_movement = $diff > 0 ? 1 : 2;

                GoodsMovement::create([
                    'date' => $param['adjustment_date'],
                    'import_flag' => $key['import_flag'],
                    'material_transfer_id' => null,
                    'material_transfer_item_id' => null,
                    'material_transfer_item_realisation_id' => null,
                    'facility_id' => $key['facility_id'],
                    'goods_id' => $key['goods_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'type_movement' => $type_movement, // 1 for incoming and 2 outbound
                    'qty' => $diff,
                    'order_item_id' => $key['order_item_id']
                ]);
                DB::commit();
            }

            AdjustmentItem::insert($_data);
        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ]);
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
            $query = Adjustment::with(['items' => function ($query) {
                    return $query->with('product', 'product_feature');
                }])
                //  ->with('status')
                ->find($id);
        } catch (\Throwable $th) {
            //throw $th;
            return response() - json([
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
            Adjustment::update($param)->where('$id');
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
            Adjustment::find($id)->destroy();
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
