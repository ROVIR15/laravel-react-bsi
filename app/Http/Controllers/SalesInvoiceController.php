<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice\Invoice;
use App\Models\Invoice\SalesInvoiceView;
use App\Models\Invoice\SalesInvoiceItemView;
use App\Models\Invoice\InvoiceItem;
use App\Models\Invoice\SalesInvoice;
use App\Http\Controllers\Controller;
use App\Http\Resources\Invoice\SalesInvoiceView as SalesInvoiceViewOneCollection;
use App\Http\Resources\Invoice\SalesInvoiceViewCollection;
use App\Http\Resources\Invoice\SalesInvoiceShow;

class SalesInvoiceController extends Controller
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
      $query = SalesInvoiceView::all();

      return new SalesInvoiceViewCollection($query);
      // return response()->json($query);
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
        
        $invoice = Invoice::create([
          'invoice_date' => $param['invoice_date'],
          'description' => $param['description']
        ]);

        SalesInvoice::create([
          'sales_order_id' => $param['sales_order_id'],
          'invoice_id' => $invoice->id
        ]);

        $invoiceItemCreation= [];

        foreach($param['items'] as $key){
          array_push($invoiceItemCreation, [
            'invoice_id' => $invoice->id,
            'order_item_id' => $key['order_item_id'],
            'qty' => $key['qty'],
            'amount' => $key['amount'],
          ]);
        }

        InvoiceItem::insert($invoiceItemCreation);
        
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
      }

      return response()->json([
        'success' => true
      ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      try {
        // $query = SalesInvoiceItemView::with('invoice')->where('invoice_id', $id)->get();
        $query = SalesInvoiceView::with('items')->find($id);
        return new SalesInvoiceShow($query);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
      }
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
      $param = $request->all()['payload'];

      try {
        Invoice::find($param['invoice_id'])->update($param);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
      }
      return response()->json([
        'success' => true
      ], 200);
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
        SalesInvoice::find($id)->delete();
        return response()->json([ 'success'=> true ], 200);
      } catch (Exception $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ]);
      }
    }
}
