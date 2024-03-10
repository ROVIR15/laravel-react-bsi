<?php

namespace App\Http\Controllers;

use App\Models\Inventory\GoodsMovement;
use App\Models\KITE\ExportDoc;
use App\Models\KITE\ImportDocItem;
use App\Models\Manufacture\BOM;
use Illuminate\Http\Request;
use App\Models\Manufacture\BOM_alt;
use App\Models\Manufacture\BOMItem;
use App\Models\Manufacture\BOMItem_alt;
use App\Models\Order\PurchaseOrder;
use App\Models\Product\ScrapHasProductFeature;
use App\Models\Reconcile\Reconcile;
use App\Models\Reconcile\ReconcileHasSalesOrder;
use App\Models\Shipment\Shipment;
use DB;
use Exception;

class BOM_AltController extends Controller
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
            $query = BOM_alt::with('items', 'product_feature')->get();
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


    /**
     * Store a newly created resource in storage
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $param = $request->all()['payload'];

        try {
            $bom_alt = BOM_Alt::create([
                'product_feature_id' => $param['product_feature_id']
            ]);

            $item_alt = [];
            foreach ($param['items'] as $key) {
                # code...
                array_push($item_alt, [
                    'bom_id' => $bom_alt['id'],
                    'product_feature_id' => $key['product_feature_id'],
                    'consumption' => $key['consumption'],
                    'allowance' => $key['allowance'],
                    'unit_price' => $key['unit_price']
                ]);
            }

            BOMItem_alt::insert($item_alt);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 500);
    }

    /**
     * Display a resource 
     * 
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $query = BOM_alt::where('id', $id)->with('items', 'product_feature')->get();
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

    public function showBOMBasedCosting($id)
    {
        try {
            $query = BOM::with('product')->find($id);

            if(!$query) throw new Exception("Error Processing Requestbom", 1);

            $reconcile = Reconcile::with('order')->where('costing_id', $query->id)->orderBy('id', 'desc')->first();

            if(!$reconcile) throw new Exception("Error Processing Requestrecon", 1);

            $shipment = Shipment::with('sum', 'issuance')
              ->where('order_id', $reconcile->order_id)
              ->orderBy('id', 'desc')
              ->get();

            $export_kite = ExportDoc::where('sales_order_id', $reconcile->sales_order_id)->first();

            $items = BOMItem::with('product_feature')
                ->with('order_item')
                ->where('bom_id', $id)
                ->get()
                ->map(function ($query) {
                    $product_feature = $query->product_feature ? $query->product_feature : null;
                    $product = $product_feature ? $product_feature->product : null;
                    $goods = $product ? $product->goods : null;

                    $item_name = $goods->name . $product_feature->size . '-' . $product_feature->color;

                    $order_item = $query->order_item ? $query->order_item : null;

                    $consumed_total = 0;
                    $stock = 0;
                    $import_flag = 1;

                    $scrap = null;

                    $doc_import = null;

                    // $shpf = ScrapHasProductFeature::select('scrap_product_id')->where('ori_product_id', $product->id)->groupBy('ori_product_id')->get()->map(function($query){
                    //     return $query->scrap_product_id;
                    // });

                    // if($shpf) {
                    //     $temp_scrap = GoodsMovement::select(DB::raw('sum(qty) as jumlah'))
                    //     ->whereIn('product_id', $shpf)
                    //     ->where('type_movement', 1)
                    //     ->where('facility_id', 15)
                    //     ->groupBy('product_id')
                    //     ->get()
                    //     ->first();

                    //     if ($temp_scrap){
                    //         $scrap = $temp_scrap ? $temp_scrap->jumlah : 0;
                    //     }
                    // }

                    $temp_scrap = GoodsMovement::select(DB::raw('sum(qty) as jumlah'))
                    ->where('product_id', $product->id)
                    ->where('type_movement', 1)
                    ->where('facility_id', 15)
                    ->groupBy('product_id')
                    ->get()
                    ->first();

                    if ($temp_scrap){
                        $scrap = $temp_scrap ? $temp_scrap->jumlah : 0;
                    }

                    if($order_item){
                        $temp_consumed_total = GoodsMovement::select(DB::raw('sum(qty) as qty, order_item_id, facility_id, type_movement'))
                        ->where('order_item_id', $order_item->id)
                        ->where('type_movement', 2)
                        ->where('facility_id', 3)
                        ->groupBy('order_item_id')
                        ->get()
                        ->first();

                        if($temp_consumed_total){
                            $consumed_total = $temp_consumed_total ? $temp_consumed_total->qty : 0;
                        }
                        
                        $temp_stock = GoodsMovement::select(DB::raw('sum(qty) as qty, order_item_id, facility_id, type_movement'))
                        ->where('order_item_id', $order_item->id)
                        ->where('type_movement', 1)
                        ->where('facility_id', 3)
                        ->groupBy('order_item_id')
                        ->get()
                        ->first();

                        if($temp_stock){
                            $stock = $temp_stock ? $temp_stock->qty : 0;
                        }
                        
                        $doc_import = ImportDocItem::with('doc')->where('order_item_id', $order_item->id)->get()->first();
                        // $import_flag = !is_null($doc_import) ? 2 : 1;

                        $purchase_order = PurchaseOrder::where('order_id', $order_item->order_id)->first();
                        $flagg = $purchase_order->import_flag;

                        $import_flag = 1;
                        
                        if ($flagg === 1) {
                            $import_flag = 2;
                        } elseif ($flagg === 2) {
                            $import_flag = 3;
                        } else {
                            $import_flag = 1;
                        }
                    }

                    $scrap_val = $scrap ? $scrap : 0;

                    return [
                        'id' => $query->id,
                        'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                        'bom_id' => $query->bom_id,
                        'product_id' => $product->id,
                        'product_feature_id' => $query->product_feature_id,
                        'goods_id' => $goods->id,
                        'unit_measurement' => $goods->satuan,
                        'item_name' => $item_name,
                        'consumption' => $query->consumption,
                        'allowance' => $query->allowance,
                        'scrap_conversion' => $query->scrap_conversion,
                        'converted_scrap' => $query->scrap_conversion > 0 ? number_format($scrap_val/$query->scrap_conversion, 2) . ' kg' : 0 . ' kg',
                        'unit_price' => $query->unit_price,
                        'order_qty' => $order_item ? $order_item->qty : 0,
                        'available_qty' => $stock + $consumed_total,
                        'consumed_material_qty' => $consumed_total * -1,
                        'export_document_id' => $doc_import ? $doc_import->id : 'Tidak Ada',
                        'bl_number' => $doc_import ? $doc_import->doc->bl_number : 'Tidak Ada',
                        'pl_number' => $doc_import ? $doc_import->doc->pl_number : 'Tidak Ada',
                        'document_number' => $doc_import ? $doc_import->doc->document_number : 'Tidak Ada',
                        'item_serial_number' => $doc_import ? $doc_import->item_serial_number : 'Tidak Ada',
                        'scrap' => $scrap_val . ' ' . $goods->satuan
                    ];
                });
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query,
            'items' => $items,
            'reconcile' => $reconcile,
            'export_license' => $export_kite,
            'shipment' => $shipment
        ], 200);
    }


    /**
     * Get BoM item alt resources based on bom_id
     * 
     * @param $bom_id
     * @return \Illuminate\Http\Response
     * 
     */
    public function getBOMItem_alt($bom_id)
    {
        try {
            $query = BOMItem_alt::where('bom_id', $bom_id)->get();
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

    /**
     * Delete a data from rows
     * 
     * @param $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            BOM_alt::find($id)->delete();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }
}
