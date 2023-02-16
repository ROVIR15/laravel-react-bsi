<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reconcile\Reconcile;
use App\Models\Reconcile\ReconcileHasPurchaseOrder;
use App\Models\Order\OrderItem;
use App\Models\Manufacture\BOMItem;

class ReconcileController extends Controller
{
    //
    public function getAllOrderItem(Request $request)
    {
        $param = $request->all()['payload'];

        try {
            $query = OrderItem::whereIn('order_id', $param['order_id'])->get();
            $query2 = BOMItem::where('bom_id', $param['bom_id'])->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'order_item' => $query,
            'bom_item' => $query2
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $reconcile = Reconcile::with('costing2', 'order')->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json(['data' => $reconcile]);
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

            $reconcile = Reconcile::create([
                'costing_id' => $param['costing_id'],
                'sales_order_id' => $param['sales_order']['id'],
                'order_id' => $param['sales_order']['order_id']
            ]);

            if (!isset($reconcile)) throw new Exception('error reconcile not created');

            $rpo = [];
            foreach ($param['purchase_order'] as $key) {
                array_push($rpo, [
                    'reconcile_id' => $reconcile['id'],
                    'purchase_order_id' => $key['purchase_order_id'],
                    'order_id' => $key['order_id']
                ]);
            }

            ReconcileHasPurchaseOrder::insert($rpo);
        } catch (Throwable $th) {
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
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $query = Reconcile::with('costing', 'po', 'order', 'shipment', 'invoice')->find($id);
            return response()->json(['data' => $query]);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add Data to Reconcile Has Purchase Order
     * 
     * @param data
     * @return \Illuminate\Http\Response
     * 
     */

    public function insertReconcilePurchaseOrder(Request $request)
    {
        $param = $request->all()['payload'];

        try {
            //code...
            $rpo = [];
            foreach ($param as $key) {
                array_push($rpo, [
                    'reconcile_id' => $key['reconcile_id'],
                    'purchase_order_id' => $key['purchase_order_id'],
                    'order_id' => $key['order_id']
                ]);
            }

            ReconcileHasPurchaseOrder::insert($rpo);

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
}
