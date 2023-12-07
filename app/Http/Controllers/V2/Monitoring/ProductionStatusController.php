<?php

namespace App\Http\Controllers\V2\Monitoring;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Monitoring\Cutting;
use App\Models\Monitoring\FinishedGoods;
use App\Models\Monitoring\Qc;
use App\Models\Monitoring\Sewing;
use App\Models\Order\OrderItem;
use App\Models\Order\SalesOrder;
use Illuminate\Support\Facades\DB;

class ProductionStatusController extends Controller
{
    //

    public function index($order_id, Request $request)
    {
        $date = $request->query('date');

        try {
            $sales_order = SalesOrder::find($order_id);

            if (empty($date)) {
                $date = date('Y-m-d');
            }

            if (!isset($sales_order)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sales Order not found!'
                ], 404);
            }

            $query = OrderItem::with('product_feature')
                ->with(['wip_cutting2' => function ($query) {
                    return $query->select('product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', DB::raw('sum(output) as total_output, MIN(date) as start_date, max(date) as last_date'))->groupBy('order_item_id');
                }])

                ->with(['wip_sewing2' => function ($query) {
                    return $query->select('product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', DB::raw('sum(output) as total_output, MIN(date) as start_date, max(date) as last_date'))->groupBy('order_item_id');
                }])
                ->with(['wip_qc2' => function ($query) {
                    return $query->select('product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', DB::raw('sum(output) as total_output, MIN(date) as start_date, max(date) as last_date'))->groupBy('order_item_id');
                }])
                ->with(['wip_fg2' => function ($query) {
                    return $query->select('product_feature_id', 'order_id', 'order_item_id', 'sales_order_id', DB::raw('sum(output) as total_output, MIN(date) as start_date, max(date) as last_date'))->groupBy('order_item_id');
                }])
                ->where('order_id', $sales_order->order_id)
                ->get()
                ->map(function ($query) use ($date) {
                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $product_feature->product ? $product_feature->product : null;
                    $goods = $product->goods ? $product->goods : null;

                    $item_name = '';
                    if (!is_null($product_feature) && !is_null($product) & !is_null($goods)) {
                        $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;
                    }

                    $total_cutting = isset($query->wip_cutting2) ? $query->wip_cutting2[0] : null;
                    $total_sewing = isset($query->wip_sewing2) ? $query->wip_sewing2[0] : null;
                    $total_qc = isset($query->wip_qc2) ? $query->wip_qc2[0] : null;
                    $total_fg = isset($query->wip_fg2) ? $query->wip_fg2[0] : null;

                    $today_cutting_output = Cutting::select('id', 'date', 'order_item_id', DB::raw('sum(output) as current_output'))
                                            ->where('order_item_id', $query->id)
                                            ->whereDate('date', '=', $date)
                                            ->groupBy('order_item_id')
                                            ->get();
                    $today_sewing_output =  Sewing::select('id', 'date', 'order_item_id', DB::raw('sum(output) as current_output'))
                                            ->where('order_item_id', $query->id)
                                            ->whereDate('date', '=', $date)
                                            ->groupBy('order_item_id')
                                            ->get();
                    $today_qc_output =  Qc::select('id', 'date', 'order_item_id', DB::raw('sum(output) as current_output'))
                                        ->where('order_item_id', $query->id)
                                        ->whereDate('date', '=', $date)
                                        ->groupBy('order_item_id')
                                        ->get();
                    $today_fg_output =  FinishedGoods::select('id', 'date', 'order_item_id', DB::raw('sum(output) as current_output'))
                                        ->where('order_item_id', $query->id)
                                        ->whereDate('date', '=', $date)
                                        ->groupBy('order_item_id')
                                        ->get();

                    $import_flag = 1;

                    return [
                        'id' => $query->id,
                        'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                        'item_name' => $item_name,
                        'qty' => $query->qty,
                        'total_cutting' => !is_null($total_cutting) ? $total_cutting->total_output : 0,
                        'total_sewing' => !is_null($total_sewing) ? $total_sewing->total_output : 0,
                        'total_qc' => !is_null($total_qc) ? $total_qc->total_output : 0,
                        'total_fg' => !is_null($total_fg) ? $total_fg->total_output : 0,

                        'current_cutting' => count($today_cutting_output) ? $today_cutting_output[0]->current_output : 0,
                        'current_sewing' => count($today_sewing_output) ? $today_sewing_output[0]->current_output : 0,
                        'current_qc' => count($today_qc_output) ? $today_qc_output[0]->current_output : 0,
                        'current_fg' => count($today_fg_output) ? $today_fg_output[0]->current_output : 0,

                        'balance_cutting' => !is_null($total_cutting) ? $total_cutting->total_output - $query->qty : 0,
                        'balance_sewing' => !is_null($total_sewing) ? $total_sewing->total_output - $query->qty : 0,
                        'balance_qc' => !is_null($total_qc) ? $total_qc->total_output - $query->qty : 0,
                        'balance_fg' => !is_null($total_fg) ? $total_fg->total_output - $query->qty : 0,
                    ];
                });

            $carry = [
                'total_qty' => 0,
                'total_current_cutting' => 0,
                'total_current_sewing' => 0,
                'total_current_qc' => 0,
                'total_current_fg' => 0,
                'sum_of_total_cutting' => 0,
                'sum_of_total_sewing' => 0,
                'sum_of_total_qc' => 0,
                'sum_of_total_fg' => 0,
                'sum_of_balance_cutting' => 0,
                'sum_of_balance_sewing' => 0,
                'sum_of_balance_qc' => 0,
                'sum_of_balance_fg' => 0
            ];

            $data_sum = array_reduce($query->toArray(), function ($carry, $item) {
                $carry['total_qty'] += $item['qty'];
                $carry['total_current_cutting'] += $item['current_cutting'];
                $carry['total_current_sewing'] += $item['current_sewing'];
                $carry['total_current_qc'] += $item['current_qc'];
                $carry['total_current_fg'] += $item['current_fg'];
                $carry['sum_of_total_cutting'] += $item['total_cutting'];
                $carry['sum_of_total_sewing'] += $item['total_sewing'];
                $carry['sum_of_total_qc'] += $item['total_qc'];
                $carry['sum_of_total_fg'] += $item['total_fg'];
                $carry['sum_of_balance_cutting'] += $item['balance_cutting'];
                $carry['sum_of_balance_sewing'] += $item['balance_sewing'];
                $carry['sum_of_balance_qc'] += $item['balance_qc'];
                $carry['sum_of_balance_fg'] += $item['balance_fg'];

                return $carry;
            }, $carry);
        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query,
            'total' => $data_sum
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
                ->with(['wip_qc2' => function ($query) use ($date) {
                    return $query->select('id', 'date', 'sales_order_id', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output, sum(reject) as total_reject'))
                        ->whereDate('date', '=', $date)
                        ->groupBy('sales_order_id');
                }])
                ->whereDate('date', '=', $date)
                ->groupBy('sales_order_id', 'line')
                ->get()
                ->map(function ($query) {
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
