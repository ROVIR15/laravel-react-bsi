<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Study\ObservationResult;
use App\Models\Study\SPOR;
use App\Models\Study\SPORView;
use App\Http\Controllers\Controller;
use App\Http\Resources\Study\ObservationResult as ObservationResultOneCollection;
use App\Http\Resources\Study\ObservationResultCollection;

class ObservationResultController extends Controller
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
      $queryParam = $request->query('prod_study');
      $query;

      if($queryParam) {
        $query = SPORView::where('production_study_id', $queryParam)->get();
      } else {
        $query = SPORView::all();
      }
      
      return response()->json(['data' => $query]);
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
      $array_of_record_data = array();

      try {
        foreach($param as $item){
          foreach($item['result_items'] as $res_item){
            $obr_res = ObservationResult::create([
              'name' => $res_item['name'],
              'result' => $res_item['result']
            ]);
  
            $spor = SPOR::create([
              'process_study_id' => $item['process_study_id'],
              'observation_result_id' => $obr_res['id']
            ]);
          }  
        }

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
        $query = ObservationResult::find($id);
        return new ObservationResultCollection($query);
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
        ObservationResult::find($id)->update($param);
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
        ObservationResult::find($id)->delete();
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
