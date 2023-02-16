<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FInance\FinancialOrderBudget;
use App\Models\FInance\FinancialOrderBudgetItem;

class FinancialOrderBudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $query = FinancialOrderBudget::with('items')->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
    }

    /**
     * Display
     */
    public function getAReportOrderBudget(Request $request)
    {
        $monthYear = $request->query('monthYear');

        if(empty($monthYear)){
            $monthYear = date('Y-m');
        }

        $monthYear = date_create($monthYear);
        $month = date_format($monthYear, 'm');
        $year = date_format($monthYear, 'Y');  

        try {
            $query = FinancialOrderBudget::with(['items' => function($query){
                return $query->with('costing', 'costing_goods', 'costing_service', 'costing_cmt');
            }])->where('month', $month)->where('year', $year)->get();
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $query = FinancialOrderBudget::with(['items' => function($query){
                return $query->with('costing');
            }])->find($id);

        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
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
            //create data to financial order budget plan on spesific month and year
            $plan = FinancialOrderBudget::create([
                'month' => $param['month'],
                'year' => $param['year']
            ]);

            if(!$plan['id']) {
                throw new Exception("Error Processing Request", 1); 
            }
        
            $list = [];

            foreach ($param['items'] as $key) {
                array_push($list, [
                    'financial_order_budget_id' => $plan['id'],
                    'costing_id' => $key['costing_id']
                ]);
            }

            FinancialOrderBudgetItem::insert($list);
      
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update()
    {

    }

    /**
     * Store a newly created data to item of financial order budget on spesific month and year
     * 
     * @param \App\Models\Finance\FinancialOrderBudgetItem
     * @return \Illuminate\Http\Response
     */
    public function insertNewFinancialOrderBudgetItem(Request $request)
    {
        $param = $request->all()['payload'];
        try {
            FinancialOrderBudgetItem::create([
                'financial_order_budget_id' => $param['financial_order_budget_id'],
                'costing_id' => $param['costing_id']
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
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
        FinancialOrderBudget::find($id)->delete();
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
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

    public function destroyItem($id)
    {
      try {
        FinancialOrderBudgetItem::find($id)->delete();
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
      return response()->json([
        'success' => true
      ], 200);
    }
}
