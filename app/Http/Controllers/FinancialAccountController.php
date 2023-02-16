<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice\FinancialAccount;
use App\Models\Invoice\FinancialAccountType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Invoice\FinancialAccount as FinancialAccountOneCollection;
use App\Http\Resources\Invoice\FinancialAccountCollection;

class FinancialAccountController extends Controller
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
      $query = FinancialAccount::with('type')->get();

      return new FinancialAccountCollection($query);
    }

    /**
     * Get Finance Account Type 
     * 
     * @return \Illumintate\Http\Response
     */

    public function getFinanceAccountType(){
      try {
        $query = FinancialAccountType::get();

        return response()->json([
          'data' => $query
        ]);
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
        FinancialAccount::create([
          'financial_account_type_id' => $param['finance_account_type_id'],
          'account_name' => $param['account_name'],
          'account_number' => $param['account_number']
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
        $query = FinancialAccount::with('type')->find($id);
        return new FinancialAccountOneCollection($query);
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
        FinancialAccount::find($id)->update($param);
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
        FinancialAccount::find($id)->delete();
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
