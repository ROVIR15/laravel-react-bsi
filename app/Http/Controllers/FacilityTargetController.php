<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facility\FacilityTarget;
use App\Models\Monitoring\Sewing;
use DB;

class FacilityTargetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $date = $request->query('date');

      try {
        //code...
        if(!isset($date)){
            $query = FacilityTarget::with('facility')->get();
        } else {
            $query = FacilityTarget::with('facility')->where('date', $date)
            ->with(['monitoring_sewing' => function($query2) use ($date){
                  $query2->where('date', $date);
              }])
            ->get();
        }
        
      } catch (Throwable $th) {
          //throw $th;
          return response()->json([
            "success" => false,
            "data" => $th->getMessage()
          ]);    
      }

      return response()->json([
        "success" => true,
        "data" => $query,
        // "final" => $final
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
        FacilityTarget::create([
          'date' => $param['date'],
          'facility_id' => $param['facility_id'],
          'target' => $param['target']
        ]);
      } catch (Exception $th) {
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
          $query = FacilityTarget::with('monitoring_sewing')
          ->find($id);

        // return new GoodsOneCollection($goods);
        return response()->json($query);
      } catch (Exception $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\X  $X
    //  * @return \Illuminate\Http\Response
    //  */
    // public function showByFacilityId($id)
    // {
    //   try {
    //       $query = FacilityTarget::with('monitoring_sewing')
    //     //   ->whereHas('monitoring_sewing', function($query){
    //     //       $query->where('line', $id);
    //     //   })
    //       ->where('facility_id', $id)
    //       ->orderBy('date', 'desc')
    //       ->first();

    //     // return new GoodsOneCollection($goods);
    //     return response()->json($query);
    //   } catch (Exception $th) {
    //     //throw $th;
    //     return response()->json([
    //       'success' => false,
    //       'errors' => $th->getMessage()
    //     ], 500);
    //   }
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request){
        $param = $request->all()['payload'];
        try {
          FacilityTarget::find($id)->update($param);
        } catch (Exception $th) {
          return response()->json(
            [
              'success' => false,
              'errors' => $e->getMessage()
            ],
            500
          );
        }
        return response()->json(
          [
            'success' => true,
          ],
          200
        );
    }

}
