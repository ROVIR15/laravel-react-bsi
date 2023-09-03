<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KITE\ExportDoc;
use App\Models\KITE\ExportDocItem;

class KITEExportController extends Controller
{
    public function index(Request $request)
    {
        $monthYear = $request->query('monthYear');

        if (empty($monthYear)) {
            $monthYear = date('Y-m');
        }

        $monthYear = date_create($monthYear);
        $month = date_format($monthYear, 'm');
        $year = date_format($monthYear, 'Y');

        try {
            $query = ExportDoc::with('sales_order')
                ->whereYear('date', '=', $year)
                ->whereMonth('date', '=', $month)
                ->orderBy('date', 'asc')
                ->get();
        } catch (Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            // 'date' => $date,
            'data' => $query,
        ]);
    }

    public function store(Request $request)
    {
        $param = $request->all()['payload'];
        try {
            $kite = ExportDoc::create([
                'date' => $param['date'],
                'document_number' => $param['document_number'],
                'order_id' => $param['order_id'],
                'sales_order_id' => $param['sales_order_id']
            ]);

            $KITEItem = [];

            foreach ($param['items'] as $key) {
                array_push($KITEItem, [
                    'export_doc_id' => $kite['id'],
                    'order_item_id' => $key['order_item_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'qty' => $key['qty']
                ]);
            }

            ExportDocItem::insert($KITEItem);
        } catch (Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    public function show($id)
    {
        try {
            $query = ExportDoc::with('sales_order', 'items')
                ->where('id', $id)
                ->get()
                ->map(function ($query) {

                    $kite_items = [];

                    $data = (array) $query->items;

                    if (isset($data) && is_array($data)) {
                        foreach ($query->items as $next) {
                            $productFeature = $next->product_feature;
                            $product = $next->product;
                            $goods = $product ? $product->goods : null;

                            $kite_items[] =  [
                                'id' => $next->id,
                                'order_item_id' => $next->order_item_id,
                                'product_id' => $product->id,
                                'product_feature_id' => $productFeature->id,
                                'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                                'unit_price' => $next->order_item->unit_price,
                                'qty' => $next->qty,
                                'total' => $next->qty * $next->order_item->unit_price
                            ];
                        }
                    }

                    return [
                        'id' => $query->id,
                        'document_number' => $query->document_number,
                        'date' => date_format(date_create($query->date), 'Y-m-d'),
                        'po_number' => $query->sales_order->po_number,
                        'sales_order_id' => $query->sales_order_id,
                        'order_id' => $query->order_id,
                        'party' => $query->sales_order->party,
                        'items' => $kite_items
                    ];
                });
        } catch (Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            // 'date' => $date,
            'data' => $query,
        ]);
    }

    public function destroy($id)
    {
        try {
            ExportDoc::find($id)->delete();
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }

    public function update($id, Request $request)
    {
        $param = $request->all()['payload'];
        try {
            //code...
            ExportDoc::find($id)->update($param);
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
