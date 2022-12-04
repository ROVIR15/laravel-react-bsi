<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice\Invoice;
use App\Models\Invoice\InvoiceItem;
use App\Models\Invoice\InvoiceHasType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Study\Invoice as InvoiceOneCollection;
use App\Http\Resources\Study\InvoiceCollection;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $param = $request->all();
        (int) $type = $request->query('invoice_type');
        $monthYear = $request->query('monthYear');

        try {
          switch ($type) {
            case '1':
              if(isset($monthYear)){
                $monthYear = date_create($monthYear);
                $month = date_format($monthYear, 'm');
                $year = date_format($monthYear, 'Y');
                if(isset($type)) {
                  $query = InvoiceHasType::with('sales_invoice')
                  ->where('invoice_type_id', $type)
                  ->whereYear('invoice_date', '=', $year)
                  ->whereMonth('invoice_date', '=', $month)
                  ->get();
                } else {
                  $query = Invoice::all();
                }
              } else {
                if(isset($type)){
                  $query = InvoiceHasType::with('sales_invoice')
                  ->where('invoice_type_id', $type)
                  ->get();
                } else {
                  $query = Invoice::all();
                }
              }
              return response()->json([
                'data' => $query
              ]);
              break;
            
            case '2':
              if(isset($monthYear)){
                $monthYear = date_create($monthYear);
                $month = date_format($monthYear, 'm');
                $year = date_format($monthYear, 'Y');
                if(isset($type)) {
                  $query = InvoiceHasType::with('purchase_invoice')
                  ->where('invoice_type_id', $type)
                  ->whereYear('invoice_date', '=', $year)
                  ->whereMonth('invoice_date', '=', $month)
                  ->get();
                } else {
                  $query = Invoice::all();
                }
              } else {
                if(isset($type)){
                  $query = InvoiceHasType::with('purchase_invoice')
                  ->where('invoice_type_id', $type)
                  ->get();
                } else {
                  $query = Invoice::all();
                }
              }
              return response()->json([
                'data' => $query
              ]);
              break;
  
            default:
              # code...
              break;
          }
        } catch (\Throwable $th) {
          return response()->json([
            'success' => false,
            'error' => $th->getMessage()
          ]);
        }
    }

        /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        //Goods Receipt Creation
        $invoice = Invoice::create([
            'invoice_date' => $param['invoice_date'],
            'order_id' => $param['order_id'],
            'sold_to' => $param['sold_to'],
            'tax' => $param['tax'],
            'description' => $param['description']
        ]);
        //Create purchase order item
        if(!isset($invoice)) throw new Error('Invoice failed to Store');
        if(!isset($param['items'])) {
          return response()->json([
            'success' => true
          ]);
        }
        
        $IRItems = [];
        foreach($param['items'] as $key){
          array_push($IRItems, [
            'invoice_id' => $invoice->id,
            'order_item_id' => $key['order_item_id'],
            'amount' => $key['amount'],
            'qty' => $key['qty']
          ]);
        }

        InvoiceItem::insert($IRItems);

        InvoiceHasType::create([
          'invoice_id' => $invoice->id,
          'invoice_type_id' => $param['type']
        ]);

      } catch (Exception $e) {
        //throw $th;
        return response()->json(
          [
            'success' => false,
            'errors' => $e->getMessage()
          ],
          500
        );
      }
      
      return response()->json([
        'success' => true,
        'param' => $param
      ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
      $type = $request->query('invoice_type');

      try {

        if(isset($type)){
            $query = Invoice::with('items', 'party', 'sales_order', 'purchase_order')->find($id);  
        } else {
            $query = Invoice::with('party')->find($id);
        }

    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }

      return response()->json([
        'data' => $query
      ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function edit(X $x)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
      $GoodsReceiptData = $request->all()['payload'];
      try {
        $Invoice = Invoice::find($id)->update($GoodsReceiptData);

        return response()->json([
          'success' => true
        ], 200);
      } catch (Exception $th) {
          //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        $Invoice = Invoice::destroy($id);
        return response()->json([
          'success' => true,
        ], 200);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }
}
