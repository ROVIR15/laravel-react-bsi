<?php

namespace App\Http\Controllers;

use DB;

use Illuminate\Http\Request;
use App\Models\Invoice\Payment;
use App\Models\Invoice\PaymentHasInvoice;
use App\Models\Invoice\PaymentMethodType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Invoice\Payment as PaymentOneCollection;
use App\Http\Resources\Invoice\PaymentMethodType as PaymentMethodTypeOneCollection;
use App\Http\Resources\Invoice\PaymentCollection;

class PaymentController extends Controller
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
      $monthYear = $request->query('monthYear');

      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      $query = Payment::with('type', 'invoice')
      ->whereYear('effective_date', '=', $year)
      ->whereMonth('effective_date', '=', $month)
      ->get();

      return new PaymentCollection($query);
    }

    public function getPaymentGroupByRefNum(Request $request)
    {
      try {
        $query = Payment::groupBy('ref_num')->select('id', 'invoice_id', 'effective_date', 'ref_num', DB::raw('sum(amount) as total_amount'))->get();
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'data' => $query
      ]);
    }

    /**
     * Get payment method type
     * 
     */
    public function getPaymentMethodType(){
      try {
        $query = PaymentMethodType::all();

        return new PaymentMethodTypeOneCollection($query);
      } catch (\Throwable $th) {
        //throw $th;
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
        DB::beginTransaction();

        $payment = Payment::create([
          'payment_method_type_id' => $param['payment_method_type_id'],
          // 'invoice_id' => $param['invoice_id'],
          'effective_date' => $param['effective_date'],
          'ref_num' => $param['ref_num'],
          'amount' => $param['amount'],
          'comment' => $param['comment']
        ]);
        DB::commit();

        $hh = [];
        foreach ($param['invoice_id'] as $key) {
          # code...
          array_push($hh, [
            'payment_id' => $payment['id'],
            'invoice_id' => $key['id']
          ]);
        }

        PaymentHasInvoice::insert($hh);
        DB::commit();

      } catch (Exception $th) {
        DB::rollback();
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
      }

      return response()->json([
        'success' => true,
        'title' => 'New Payment Creation',
        'message' => 'The new payment has been created #' . $payment->id,
        'link' => '/finance/vendor-bills/' . $payment->id,
      ], 200);
    }

    public function insertManyPayment(Request $request)
    {
      $param = $request->all()['payload'];

      try {
        Payment::insert($param);
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true
      ]);
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
        $query = Payment::with('invoice', 'type')->find($id);
        return new PaymentOneCollection($query);
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
        Payment::find($id)->update($param);
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
        Payment::find($id)->delete();
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
