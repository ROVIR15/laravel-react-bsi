<?php

namespace App\Http\Controllers;

use DB;

use App\Http\Resources\Product\ProductFeature;
use App\Models\Manufacture\BOM;
use App\Models\Manufacture\BOMItem;
use Illuminate\Http\Request;
use App\Models\Manufacture\ManufacturePlanningItems;
use App\Models\Monitoring\Sewing;
use App\Models\Order\OrderItem;
use App\Models\Order\POBuyerProof;
use App\Models\Order\SalesOrder;
use App\Models\Reconcile\ReconcileHasSalesOrder;
use App\Models\Shipment\Shipment;

class OSRController extends Controller
{
    //

    public function get_osr_ppic_report(Request $request)
    {
        $monthYear = $request->query('monthYear');

        try {
            $monthYear = date_create($monthYear);
            $month = date_format($monthYear, 'm');
            $year = date_format($monthYear, 'Y');

            $query = ManufacturePlanningItems::with('man_plan', 'bom', 'facility', 'sales_order')
                ->with(['sewing' => function ($query) use ($month, $year) {
                    return $query
                        ->select('sales_order_id', 'order_item_id', 'facility_id', 'date', DB::raw('sum(output) as total_output, avg(output) as average_output, min(date) as real_start_date, max(date) as real_end_date'))
                        ->groupBy('facility_id', 'sales_order_id')
                        ->whereMonth('date', $month)
                        ->whereYear('date', $year);
                }])
                ->whereHas('man_plan', function ($query) use ($month, $year) {
                    return $query
                        ->where('month', '=', $month)
                        ->where('year', '=', $year);
                })
                ->orderBy('facility_id', 'asc')
                ->get()
                ->map(function ($query) {

                    $goods = count($query->sales_order->sum) ? $query->sales_order->sum[0]->product_feature->product->goods : null;
                    $totalOutput = count($query->ckck) ? $query->ckck[0]->total_output : 0;

                    return [
                        'month' => $query->man_plan->month,
                        'id' => $query->id,
                        'imageUrl' => $goods->imageUrl,
                        'line_start_date' => $query->line_start_date,
                        'line_end_date' => $query->line_end_date,
                        'sales_order_id' => $query->sales_order_id,
                        'sales_order_name' => $query->sales_order->po_number,
                        'buyer_name' => $query->sales_order->party->name,
                        'order_qty' => count($query->sales_order->sum) ? ($query->sales_order->sum[0]->total_qty) : null,
                        'avg_price' => count($query->sales_order->sum) ? ($query->sales_order->sum[0]->avg_unit_price) : null,
                        'line' => $query->facility->name,
                        'number_of_machines' => $query->number_of_machines,
                        'anticipated_pcs_per_line_output' => $query->anticipated_pcs_per_line_output,
                        'expected_output' => $query->expected_output,
                        'output' => $totalOutput
                    ];
                });

            // Initialize an empty array to store the transformed data
            $transformedData = [];

            // Iterate through the original data and group items based on the "sales_order_name"
            $groupedData = collect($query)->groupBy('sales_order_id');

            // Process each group and convert the data to the desired format
            $groupedData->each(function ($group) use (&$transformedData) {
                $item = [
                    'id' => $group[0]['id'],
                    'imageUrl' => $group[0]['imageUrl'],
                    'buyer_name' => $group[0]['buyer_name'],
                    'imageUrl' => $group[0]['imageUrl'],
                    'sales_order_name' => $group[0]['sales_order_id'],
                    'sales_order_name' => $group[0]['sales_order_name'],
                    'order_qty' => (int)$group[0]['order_qty'],
                    'avg_price' => (float)$group[0]['avg_price'],
                    'line' => $group[0]['line'],
                    'number_machines' => (int)$group[0]['number_of_machines'],
                    'line_start_date' => $group[0]['line_start_date'],
                    'line_end_date' => $group[0]['line_end_date'],
                    'anticipated_pcs_per_line_output' => (int)$group[0]['anticipated_pcs_per_line_output'],
                    'expected_output' => [],
                    'output' => $group[0]['output']
                ];

                // Loop through the months and set the expected output values
                for ($month = 1; $month <= 12; $month++) {
                    $expectedOutput = 0;
                    foreach ($group as $itemData) {
                        if ($itemData['month'] == $month) {
                            $expectedOutput = (int)$itemData['expected_output'];
                            break;
                        }
                    }
                    $item['expected_output'][] = ["value" => $expectedOutput];
                }

                // Add the transformed item to the final array
                $transformedData[] = $item;
            });

            // $jsonOutput = json_encode($transformedData, JSON_PRETTY_PRINT);
            // return $jsonOutput;

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $transformedData
        ]);
    }

    public function get_osr_ver_helmi(Request $request)
    {
        $monthYear = $request->query('monthYear');

        try {
            $monthYear = date_create($monthYear);
            $month = date_format($monthYear, 'm');
            $year = date_format($monthYear, 'Y');

            $query = ManufacturePlanningItems::with('man_plan', 'bom', 'facility', 'sales_order')
                ->with(['sewing' => function ($query) use ($month, $year) {
                    return $query
                        ->select('sales_order_id', 'order_item_id', 'facility_id', 'date', DB::raw('sum(output) as total_output, avg(output) as average_output, min(date) as real_start_date, max(date) as real_end_date'))
                        ->groupBy('facility_id', 'sales_order_id')
                        ->whereMonth('date', $month)
                        ->whereYear('date', $year);
                }])
                ->whereHas('man_plan', function ($query) use ($month, $year) {
                    return $query
                        ->where('month', '=', $month)
                        ->where('year', '=', $year);
                })
                ->orderBy('facility_id', 'asc')
                ->get()
                ->map(function ($query) {

                    $goods = count($query->sales_order->sum) ? $query->sales_order->sum[0]->product_feature->product->goods : null;

                    $totalOutput = count($query->ckck) ? $query->ckck[0]->total_output : 0;

                    $po_proof = POBuyerProof::where('sales_order_id', $query->sales_order_id)->get();

                    $po_date = count($po_proof) ? $po_proof[0]->tanggal_po : 'Belum Ada';

                    $__items = BOMItem::whereHas('product_feature', function ($query) {
                        return $query->whereHas('product_category', function ($query) {
                            return $query->where('product_category_id', 4);
                        });
                    })
                        ->where('bom_id', $query->bom_id)->get();

                    $__found_bom_item = count($__items) ? $__items[0] : null;
                    $__fabric_mill_name = null;
                    $__fabric_etd = null;
                    $__fabric_po_issued = null;

                    if (!is_null($__found_bom_item)) {
                        $__order = OrderItem::with(['order' => function ($query) {
                            return $query->with('purchase_order');
                        }])->where('costing_item_id', $__found_bom_item->id)
                            ->get();

                        $__fabric_mill_name = count($__order) ? $__order[0]->order->purchase_order->party->name : "Belum Ada";
                        $__fabric_etd = count($__order) ? $__order[0]->order->purchase_order->delivery_date : "Belum Ada";
                        $__fabric_po_issued = count($__order) ? $__order[0]->order->purchase_order->issue_date : "Belum Ada";
                    }

                    return [
                        'month' => $query->man_plan->month,
                        'id' => $query->id,
                        'imageUrl' => $goods->imageUrl,
                        'date_po_received' => $po_date,
                        'fabric_mill' => $__fabric_mill_name,
                        'fabric_po_issued' => $__fabric_po_issued,
                        'fabric_etd' => $__fabric_etd,
                        'line_start_date' => $query->line_start_date,
                        'line_end_date' => $query->line_end_date,
                        'sales_order_id' => $query->sales_order->id,
                        'sales_order_name' => $query->sales_order->po_number,
                        'garment_delivery_date' => $query->sales_order->delivery_date,
                        'buyer_name' => $query->sales_order->party->name,
                        'order_qty' => count($query->sales_order->sum) ? ($query->sales_order->sum[0]->total_qty) : null,
                        'avg_price' => count($query->sales_order->sum) ? ($query->sales_order->sum[0]->avg_unit_price) : null,
                        'line' => $query->facility->name,
                        'number_of_machines' => $query->number_of_machines,
                        'anticipated_pcs_per_line_output' => $query->anticipated_pcs_per_line_output,
                        'expected_output' => $query->expected_output,
                        'output' => $totalOutput
                    ];
                });

            // Initialize an empty array to store the transformed data
            $transformedData = [];

            // Iterate through the original data and group items based on the "sales_order_name"
            $groupedData = collect($query)->groupBy('sales_order_id');

            // Process each group and convert the data to the desired format
            $groupedData->each(function ($group) use (&$transformedData) {
                $item = [
                    'id' => $group[0]['id'],
                    'imageUrl' => $group[0]['imageUrl'],
                    'buyer_name' => $group[0]['buyer_name'],
                    'imageUrl' => $group[0]['imageUrl'],
                    'fabric_mill' => $group[0]['fabric_mill'],
                    'fabric_po_issued' => $group[0]['fabric_po_issued'],
                    'fabric_etd' => $group[0]['fabric_etd'],
                    'date_po_received' => $group[0]['date_po_received'],
                    'sales_order_id' => $group[0]['sales_order_id'],
                    'sales_order_name' => $group[0]['sales_order_name'],
                    'garment_delivery_date' => $group[0]['garment_delivery_date'],
                    'order_qty' => (int)$group[0]['order_qty'],
                    'avg_price' => (float)$group[0]['avg_price'],
                    'line' => $group[0]['line'],
                    'number_machines' => (int)$group[0]['number_of_machines'],
                    'line_start_date' => $group[0]['line_start_date'],
                    'line_end_date' => $group[0]['line_end_date'],
                    'anticipated_pcs_per_line_output' => (int)$group[0]['anticipated_pcs_per_line_output'],
                    'expected_output' => [],
                    'output' => $group[0]['output']
                ];

                // Loop through the months and set the expected output values
                for ($month = 1; $month <= 12; $month++) {
                    $expectedOutput = 0;
                    foreach ($group as $itemData) {
                        if ($itemData['month'] == $month) {
                            $expectedOutput = (int)$itemData['expected_output'];
                            break;
                        }
                    }
                    $item['expected_output'][] = ["value" => $expectedOutput];
                }

                // Add the transformed item to the final array
                $transformedData[] = $item;
            });

            // $jsonOutput = json_encode($transformedData, JSON_PRETTY_PRINT);
            // return $jsonOutput;

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $transformedData
        ]);
    }

    public function get_shipment_report(Request $request)
    {
        $monthYear = $request->query('monthYear');

        try {
            $monthYear = date_create($monthYear);
            $month = date_format($monthYear, 'm');
            $year = date_format($monthYear, 'Y');

            $query = SalesOrder::select('id', 'order_id', 'po_number', 'delivery_date')
                ->with('sum')
                ->whereMonth('delivery_date', $month)
                ->whereYear('delivery_date', $year)
                ->get()
                ->map(function ($query) {
                    $info = count($query->sum) ? $query->sum[0] : null;

                    $shipment = Shipment::with('sum')->where('order_id', $query->order_id)->get();

                    $_shipment = count($shipment) ? $shipment[0] : null;

                    if (is_null($_shipment)) {
                        $qty_shipped =  0;
                    } else {
                        $_shipment_sum = count($_shipment->sum) ? $_shipment->sum[0] : null;
                        $qty_shipped =  $_shipment_sum->total_qty;
                    }

                    if (is_null($info)) {
                        $order_qty = 0;
                        $image_url = null;
                    } else {
                        $order_qty =  $info->total_qty;
                        $image_url = $info->product_feature->product->goods->imageUrl;
                    }
                    return [
                        'id' => $query->id,
                        'sales_order_name' => $query->po_number,
                        'delivery_date' => $query->delivery_date,
                        'order_qty' => $order_qty,
                        'image_url' => $image_url,
                        'total_delivery_qty' => $qty_shipped
                    ];
                });

            $query_alt_so = SalesOrder::select('id', 'order_id', 'po_number', 'delivery_date')
                ->with('sum')
                ->whereMonth('delivery_date', '>=', 7)
                ->whereMonth('delivery_date', '<', $month)
                ->whereYear('delivery_date', $year)
                ->get()
                ->map(function ($query) {
                    $info = count($query->sum) ? $query->sum[0] : null;

                    $shipment = Shipment::with('sum')->where('order_id', $query->order_id)->get();

                    $_shipment = count($shipment) ? $shipment[0] : null;

                    if (is_null($_shipment)) {
                        $qty_shipped =  0;
                    } else {
                        $_shipment_sum = count($_shipment->sum) ? $_shipment->sum[0] : null;
                        $qty_shipped =  $_shipment_sum->total_qty;
                    }

                    if (is_null($info)) {
                        $order_qty = 0;
                        $image_url = null;
                    } else {
                        $order_qty =  $info->total_qty;
                        $image_url = $info->product_feature->product->goods->imageUrl;
                    }
                    return [
                        'id' => $query->id,
                        'sales_order_name' => $query->po_number,
                        'delivery_date' => $query->delivery_date,
                        'order_qty' => $order_qty,
                        'image_url' => $image_url,
                        'total_delivery_qty' => $qty_shipped
                    ];
                });
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query,
            'data_prev' => $query_alt_so
        ]);
    }
}
