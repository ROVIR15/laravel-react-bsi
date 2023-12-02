<?php

namespace App\Http\Controllers\V2\Finance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Invoice\Invoice;
use App\Models\Invoice\InvoiceItem;
use App\Models\Order\Order;
use App\Models\Order\PurchaseOrder;
use App\Models\Order\SalesOrder;
use Throwable;

class InvoiceController extends Controller
{
    //

    public function index(Request $request) 
    {
        $invoice_type = $request->query('invoice_type');
        $month = $request->query('month');
        $year = $request->query('year');
        $paginate = $request->query('paginate');

        try {
            $query = Invoice::with('party', 'sum', 'type')
                    ->whereHas('type', function($query) use ($invoice_type){
                        return $query->where('invoice_type_id', $invoice_type);
                    })
                    ->whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->paginate($paginate)
                    ->map(function ($query) use ($invoice_type){

                        $summary = count($query->sum) ? $query->sum[0] : null;
                        $total_amount = !is_null($summary) ? $summary->total_amount : 0;

                        $invoice_type_ = $query->type->invoice_type_id == 1 ? 'INV-' : 'INV-VB-';
                        $invoice_type_desc = $query->type->invoice_type_id == 1 ? 'Invoice ke Buyer (Jual)' : 'Invoice dari Buyer (Beli)';

                        $party_name = 'Empty';
                        if($invoice_type === "1") {
                            $so = SalesOrder::with('party')->where('order_id', $query->order_id)->get();

                            $party_name = count($so) ? $so[0]->party->name : 'Empty';
                        } else if($invoice_type === "2") {
                            $po = PurchaseOrder::with('party')->where('order_id', $query->order_id)->get();
                            $party_name = count($po) ? $po[0]->party->name : 'Empty';
                        } else {
                            $party_name = 'Not Defined';
                        }

                        return [
                            'id' => $query->id,
                            'invoice_id' => $query->id,
                            'uid' => $invoice_type_ . str_pad($query->id, 4, "0", STR_PAD_LEFT),
                            'order_id' => $query->order_id,
                            'issued_party' => $invoice_type === "1" ? 'PT Buana Sandang Indonesia' : $party_name,
                            'billed_party' => !is_null($query->party) && $invoice_type === 2 ? $query->party->name : "PT Buana Sandang Indonesia",
                            'invoice_type_desc' => $invoice_type_desc,
                            'invoice_date' => $query->invoice_date,
                            'due_date' => $query->due_date,
                            'description' => $query->description,
                            'total_amount' => $total_amount,
                            'tax' => $query->tax
                        ];
                    });

        } catch (\Throwable $err) {
            $error_message = $err->getMessage();

            return response()->json([
                'success' => false,
                'error' => $error_message
            ], 500);
        }

        return response()->json($query, 200);
    }

    public function items($id)
    {
        try {
            $query = InvoiceItem::with('order_item')
                    ->where('invoice_id', $id)
                    ->get()
                    ->map(function ($query, $index){

                        $order_item = $query->order_item ? $query->order_item : null;
                        $product_feature = $order_item->product_feature ? $order_item->product_feature : null;
                        $product = $product_feature->product ? $product_feature->product : null;
                        $goods = $product->goods ? $product->goods : null;

                        $order = null;
                        if (!is_null($order_item)){
                            $order = Order::find($order_item->order_id);
                        }

                        $import_flag = 1;
                        if (!is_null($order)){
                            $import_flag = $order->import_flag ? 2 : 1;
                        }

                        $item_name = '';
                        if (!is_null($product_feature) && !is_null($product) & !is_null($goods)){
                            $item_name = $goods['name'] . ' ' . $product_feature->color . ' ' . $product_feature->size;                            
                        }

                        return [
                            'id' => $query->id,
                            'invoice_item_id' => 'INV-' . str_pad($query->invoice_id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($index + 1, 2, '0', STR_PAD_LEFT),
                            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                            'invoice_id' => 'INV-' . str_pad($query->invoice_id, 4, '0', STR_PAD_LEFT),
                            'item_name' => $item_name,
                            'qty' => $query->qty,
                            'amount' => $query->amount
                        ];
                    });
            
        } catch (\Throwable $err) {
            $error_message = $err->getMessage();

            return response()->json([
                'success' => false,
                'error' => $error_message
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ], 200);
    }
}
