<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Study\SamplingStudy;
use App\Models\Study\SampleProcessStudy;
// Models View Production Study

use App\Http\Controllers\Controller;
use App\Http\Resources\Study\SamplingStudyA as SamplingStudyAOneCollection;
use App\Http\Resources\Study\SamplingStudyACollection;
use App\Http\Resources\Study\SamplingStudy as SamplingStudyOneCollection;
use App\Http\Resources\Study\SamplingStudyCollection;

class SamplingStudyController extends Controller
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
      $query = SamplingStudy::with('product', 'work_center')->get();

      return new SamplingStudyACollection($query);
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
        $samplingStudy = SamplingStudy::create([
          'product_id' => $param['product_id'],
          'work_center_id' => $param['work_center_id']
        ]);

        $temp = [];
        foreach ($param['study_payload'] as $item) {
          # code...
          array_push($temp, [
            'sampling_study_id' => $samplingStudy['id'],
            'name' => $item['process_name'],
            'time_1' => $item['time_1'],
            'machine_code' => $item['machine_code']
          ]);
        }

        SampleProcessStudy::insert($temp);

      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
      }
      return response()->json([
        'success' => true,
        'sample_study_id' => $samplingStudy['id']
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
        $query = SamplingStudy::with('data', 'work_center', 'product')->find($id);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
      }

      return new SamplingStudyOneCollection($query);
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
        SampleProcessStudy::find($id)->update($param);
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
        SamplingStudy::find($id)->delete();
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
