<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Study\ProductionStudy;
use App\Models\Study\ProcessStudy;
// Models View Production Study
use App\Models\Study\ProductionStudyView;
use App\Models\Study\ProcessStudyView;
use App\Models\Study\SPORView;

use App\Http\Controllers\Controller;
use App\Http\Resources\Study\ProductionStudy as ProductionStudyOneCollection;
use App\Http\Resources\Study\ProductionStudyCollection;

class ProductionStudyController extends Controller
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
      $query = ProductionStudyView::all();

      return response()->json([
        'data' => $query
      ], 200);
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
        $productionStudy = ProductionStudy::create([
          'product_id' => $param['product_id'],
          'work_center_id' => $param['work_center_id']
        ]);

        $temp = [];
        foreach ($param['process_list'] as $item) {
          # code...
          array_push($temp, [
            'production_study_id' => $productionStudy['id'],
            'party_id' => $item['labor_id'],
            'process_id' => $item['process_id']
          ]);
        }

        ProcessStudy::insert($temp);

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
        $query = ProductionStudyView::with('process_list')->find($id);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
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
      $param = $request->all()['payload'];
      try {
        ProductionStudy::find($id)->update($param);
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
        ProductionStudy::find($id)->delete();
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
