<?php

namespace App\Http\Controllers;

use App\Http\Resources\Product\ProductFeature;
use Illuminate\Http\Request;
use App\Models\Manufacture\ManufacturePlanningItems;
use App\Models\Monitoring\Sewing;

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

            $query = ManufacturePlanningItems::with('man_plan', 'bom', 'facility', 'sales_order', 'ckck')
                ->whereHas('man_plan', function ($query) use ($month, $year) {
                    return $query
                        ->where('month', '=', $month)
                        ->where('year', '=', $year);
                })
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
                    'expected_output' => []
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
}
