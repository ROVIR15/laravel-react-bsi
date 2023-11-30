<?php

namespace App\Http\Controllers\V2\Finance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Inventory\MaterialTransfer;
use App\Models\Inventory\MaterialTransferItem;
use App\Models\Facility\Facility;

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
                            // ->where('from_facility_id', $from_facility)
                            // ->where('to_facility_id', $to_facility)
                            ->paginate($paginate)
                            ->map(function ($query){
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
            ->map(function ($query, $index){
                $product_feature = $query->product_feature ? $query->product_feature : null;
                $product = $product_feature->product ? $product_feature->product : null;
                $goods = $product->goods ? $product->goods : null;

                $item_name = '';
                if (!is_null($product_feature) && !is_null($product) & !is_null($goods)){
                    $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;                            
                }

                $import_flag = 1;

                $realisation = count($query->transferred) ? $query->transferred[0] : null;
                // if (!is_null($order)){
                //     $import_flag = $order->import_flag ? 2 : 1;
                // }

                // $import_flag = $order->import_flag ? 2 : 1;

                return [
                    'id' => $query->id,
                    'material_transfer_item_uid' => 'MT-' . str_pad($query->material_transfer_id, 4, "0", STR_PAD_LEFT) . '-' . str_pad($index+1, 2, "0", STR_PAD_LEFT),
                    'material_transfer_id' => $query->material_transfer_id,
                    'material_transfer_name' => 'MT-' . str_pad($query->material_transfer_id, 4, "0", STR_PAD_LEFT),
                    'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                    'item_name' => $item_name,
                    'req_transfer_qty' => $query->transfer_qty,
                    'filled_transfer_qty' => !is_null($realisation) ? $realisation->transferred_qty : 0
                ];
            });

            if(!count($query)){
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