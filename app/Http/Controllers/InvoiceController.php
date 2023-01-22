<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Party\PartyRoles;
use App\Models\Invoice\Invoice;
use App\Models\Invoice\InvoiceTerm;
use App\Models\Invoice\PaymentHasInvoice;
use App\Models\Invoice\InvoiceHasShipment;
use App\Models\Invoice\InvoiceItem;
use App\Models\Invoice\InvoiceHasType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Study\Invoice as InvoiceOneCollection;
use App\Http\Resources\Study\InvoiceCollection;

use DB;

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
                  $query = InvoiceHasType::with('sales_invoice', 'terms')
                  ->where('invoice_type_id', $type)
                  ->whereYear('invoice_date', '=', $year)
                  ->whereMonth('invoice_date', '=', $month)
                  ->get();
                } else {
                  $query = Invoice::all();
                }
              } else {
                if(isset($type)){
                  $query = InvoiceHasType::with('sales_invoice', 'terms')
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
                  $query = InvoiceHasType::with('purchase_invoice', 'terms')
                  ->where('invoice_type_id', $type)
                  ->whereYear('invoice_date', '=', $year)
                  ->whereMonth('invoice_date', '=', $month)
                  ->get();
                } else {
                  $query = Invoice::all();
                }
              } else {
                if(isset($type)){
                  $query = InvoiceHasType::with('purchase_invoice', 'terms')
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

    public function paymentInvoice(Request $request){
      $type = $request->query('invoice_type');

      try {
        $_invoiceList = PaymentHasInvoice::select('invoice_id')->get();
        if(isset($type)){
          $query = InvoiceHasType::with('sales_invoice')
          ->where('invoice_type_id', $type)
          ->whereNotIn('invoice_id', $_invoiceList)
          ->get();
        } else {
          $query = Invoice::
          whereNotIn('id', $_invoiceList)
          ->get();
        }  
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'succees' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'data' => $query
      ]);

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
            'order_id' => $param['order_id'][0],
            'shipment_id' => $param['shipment_id'][0],
            'due_date' => $param['due_date'],
            'sold_to' => $param['sold_to'],
            'tax' => $param['tax'],
            'description' => $param['description']
        ]);

        //Record Invoice and Shipment
        $hh = [];
        foreach ($param['shipment_id'] as $key) {
          # code...
          array_push($hh, [
            'invoice_id' => $invoice['id'],
            'shipment_id' => $key
          ]);
        }

        $terms = [];
        foreach ($param['terms'] as $key) {
          # code...
          array_push($terms, [
            'invoice_id' => $invoice['id'],
            'term_description' => $key['term_description'],
            'term_value' => $key['term_value'],
            'value_type' => $key['value_type']
          ]);
        }

        InvoiceHasShipment::insert($hh);
        
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

        InvoiceTerm::insert($terms);

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
            $query = Invoice::with('items', 'party', 'sales_order', 'purchase_order', 'status', 'terms')->find($id);  
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

    public function generateReport(Request $request)
    {

      $paramParty = $request->query('party');
      $monthYear = $request->query('monthYear');

      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      try {
        $party = Invoice::select('sold_to')
                 ->with('party')
                 ->groupBy('sold_to')
                 ->where('sold_to', $paramParty)
                 ->get();

        $date = Invoice::select('sold_to', DB::raw('DATE_ADD(invoice_date, INTERVAL due_date DAY) as invoice_date'))
                 ->groupBy('invoice_date')
                 ->orderBy('invoice_date', 'asc')
                 ->where('sold_to', $paramParty)
                 ->whereMonth(DB::raw('DATE_ADD(invoice_date, INTERVAL due_date DAY)'), $month)
                 ->whereYear(DB::raw('DATE_ADD(invoice_date, INTERVAL due_date DAY)'), $year)
                 ->get();

        $_party = [];
        $_date = [];

        foreach ($party as $key) {
          array_push($_party, $key['sold_to']);
        }

        foreach ($date as $key) {
          array_push($_date, $key['invoice_date']);
        }


        $ss = Invoice::select(
                'id',
                'order_id',
                'sold_to',
                'invoice_date',
                'due_date',
                DB::raw('DATE_ADD(invoice_date, INTERVAL due_date DAY) as due_dates')
              )
              ->with('sum', 'terms', 'party', 'sales_order')
              ->where('sold_to', $paramParty)
              ->whereMonth(DB::raw('DATE_ADD(invoice_date, INTERVAL due_date DAY)'), $month)
              ->whereYear(DB::raw('DATE_ADD(invoice_date, INTERVAL due_date DAY)'), $year)
              ->get();
              
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
      return response()->json([
        'success' => true,
        'buyer' => $party,
        'date' => $_date,
        'data' => $ss
      ], 200);
    }

    public function getInvoicedParty()
    {
      try {
        $query = Invoice::select('sold_to')->with('party')->groupBy('sold_to')->get();
        
      } catch (\Throwable $th) {
        //throw $th;

        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json(['data' => $query]);
    }
}
