<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice\InvoiceStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\Invoice\InvoiceStatus as InvoiceStatusOneCollection;
use App\Http\Resources\Invoice\InvoiceStatusCollection;

class InvoiceStatusController extends Controller
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
      $query = InvoiceStatus::all();

      return new InvoiceStatusCollection($query);
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
        InvoiceStatus::create([
          'invoice_id' => $param['invoice_id'],
          'invoice_status_type_id' => $param['invoice_status_type_id']
        ]);
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
        $query = InvoiceStatus::find($id);
        return new InvoiceStatusCollection($query);
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
        InvoiceStatus::find($id)->update($param);
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
        // InvoiceStatus::find($id)->delete();
        // return response()->json([ 'success'=> true ], 200);
      } catch (Exception $th) {
        //throw $th;
        // return response()->json([
        //   'success' => false,
        //   'errors' => $th->getMessage()
        // ]);
      }
    }
}
