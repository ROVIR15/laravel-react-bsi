<?php

namespace App\Http\Controllers;

use App\Models\KITE\ImportDoc;
use App\Models\KITE\ImportDocItem;
use Illuminate\Http\Request;

use DB;

class KITEImportController extends Controller
{
    //
    public function update_item($id, Request $request)
    {
        $param = $request->all()['payload'];

        try {
            //code...
            ImportDocItem::find($id)->update($param);
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
            $query = ImportDoc::with('purchase_order')
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
            DB::beginTransaction();

            $kite = ImportDoc::create([
                'date' => $param['date'],
                'document_number' => $param['document_number'],
                'type' => $param['customs_document_type'],
                'order_id' => $param['order_id'],
                'purchase_order_id' => $param['purchase_order_id']
            ]);
            DB::commit();

            //Create KITE item
            $KITEItem = [];

            foreach ($param['items'] as $key) {
                array_push($KITEItem, [
                    'kite_import_doc_id' => $kite['id'],
                    'order_item_id' => $key['order_item_id'],
                    'product_id' => $key['product_id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'hs_code' => $key['hs_code'],
                    'item_serial_number' => $key['item_serial_number']
                ]);
            }

            ImportDocItem::insert($KITEItem);
            DB::commit();
        } catch (Throwable $th) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'title' => 'PIB Creation',
            'message' => 'The new PIB has been created #' . $kite->id,
            'link' => '/kite/export/' . $kite->id,
        ], 200);
    }

    public function show($id)
    {
        try {
            $query = ImportDoc::with('purchase_order', 'items')
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
                                'sku_id' => str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
                                'order_item_id' => $next->order_item_id,
                                'product_id' => $product->id,
                                'product_feature_id' => $productFeature->id,
                                'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                                'item_serial_number' => $next->item_serial_number,
                                'hs_code' => $next->hs_code,
                                'unit_price' => $next->order_item->unit_price,
                                'qty' => $next->order_item->qty,
                                'total' => $next->order_item->qty * $next->order_item->unit_price
                            ];
                        }
                    }

                    return [
                        'id' => $query->id,
                        'document_number' => $query->document_number,
                        'type' => $query->type,
                        'date' => date_format(date_create($query->date), 'Y-m-d'),
                        'po_number' => $query->purchase_order->po_number,
                        'purchase_order_id' => $query->purchase_order_id,
                        'order_id' => $query->order_id,
                        'party' => $query->purchase_order->party,
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
            ImportDoc::find($id)->delete();
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
            ImportDoc::find($id)->update($param);
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
