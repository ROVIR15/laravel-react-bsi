<?php

namespace App\Http\Controllers\V2\Monitoring;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Monitoring\Sewing;
use App\Models\Order\OrderItem;
use Illuminate\Support\Facades\DB;

class ProductionStatusController extends Controller
{
    //

    public function index($order_id, Request $request)
    {
        try {
            $query = OrderItem::with('product_feature')
                            ->with(['wip_sewing2' => function($query){
                                return $query->select('product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', DB::raw('sum(output) as total_output, MIN(date) as start_date, max(date) as last_date'))->groupBy('order_item_id');
                            }])
                            ->with(['wip_qc2' => function($query){
                                return $query->select('product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', DB::raw('sum(output) as total_output, MIN(date) as start_date, max(date) as last_date'))->groupBy('order_item_id');
                            }])
                            ->with(['wip_fg2' => function($query){
                                return $query->select('product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', DB::raw('sum(output) as total_output, MIN(date) as start_date, max(date) as last_date'))->groupBy('order_item_id');
                            }])
                            ->where('order_id', $order_id)
                            ->get()
                            ->map(function($query){
                                $product_feature = $query->product_feature ? $query->product_feature : null;
                                $product = $product_feature->product ? $product_feature->product : null;
                                $goods = $product->goods ? $product->goods : null;
                
                                $item_name = '';
                                if (!is_null($product_feature) && !is_null($product) & !is_null($goods)){
                                    $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;                            
                                }

                                $total_sewing = count($query->wip_sewing) ? $query->wip_sewing[0] : null;
                                $total_qc = count($query->wip_qc) ? $query->wip_qc[0] : null;
                                $total_fg = count($query->wip_fg) ? $query->wip_fg[0] : null;

                                // $sumCallback = function ($result, $item){
                                //     if(isset($item["total_output"])){
                                //         return $result += $item["total_output"];
                                //     } else {
                                //         return $result += 0;
                                //     }
                                // };

                                // $reduce_array = 0;

                                // if (is_array($query->wip_sewing)){
                                //     $reduce_array = array_reduce($query->wip_sewing, $sumCallback);
                                // }
                
                                $import_flag = 1;
                
                                return [
                                    'id' => $query->id,
                                    'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                                    'item_name' => $item_name,
                                    'qty' => $query->qty,
                                    'total_sewing' => is_null($total_sewing) ? 0 : $total_sewing->total_output,
                                    'total_qc' => is_null($total_qc) ? 0 : $total_qc->total_output,
                                    'total_fg' => is_null($total_fg) ? 0 : $total_fg->total_output
                                ];
                            });

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

    public function getDataBasedOnStyleFilterByDay(Request $request)
    {
        $date = $request->query('date');
        
        try {
            //code...
            $query = Sewing::select('id', 'date', 'order_id', 'order_item_id', 'product_feature_id', 'sales_order_id', 'facility_id', DB::raw('sum(output) as total_output'))
            // $query = Sewing::select('id', 'date')
                            ->with('sales_order', 'facility')
                            ->with(['wip_qc2' => function ($query) use ($date){
                                return $query->select('id', 'date', 'sales_order_id', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output, sum(reject) as total_reject'))
                                             ->whereDate('date', '=', $date)
                                             ->groupBy('sales_order_id');
                            }])
                            ->whereDate('date', '=', $date)
                            ->groupBy('sales_order_id', 'line')
                            ->get()
                            ->map(function ($query){
                                $res_sewing = $query->total_output;
                                $res_qc = count($query->wip_qc2) ? $query->wip_qc2[0] : null;
                                $total_checked = !is_null($res_qc) ? $res_qc['total_output'] : 0;
                                $total_reject = !is_null($res_qc) ? $res_qc['total_reject'] : 0;

                                return [
                                    'date' => $query->date,
                                    'label_name' => $query->facility->name . ' - ' . $query->sales_order->po_number,
                                    'total_output_sewing' => $res_sewing,
                                    'total_checked' => $total_checked,
                                    'total_reject' => $total_reject
                                ];
                            });

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
}
