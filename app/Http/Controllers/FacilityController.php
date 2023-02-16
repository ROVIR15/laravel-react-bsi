<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facility\Facility;
use App\Models\Facility\FacilityType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Facility\FacilityCollection;
use App\Http\Resources\Facility\Facility as FacilityOneCollection;

class FacilityController extends Controller
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
      $type = $request->query('type');

      try {
        //code...
        $query;

        if(!isset($type)){
          $query = Facility::with('type')->get();          
        } else {
          $query = FacilityType::with('facilities')
          ->where('name', $type)
          ->first();

          return response()->json([
            'data' => $query->facilities
          ]);
        }
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return new FacilityCollection($query);
    }

    /**
     * Get Facility Type
     */

    public function getFacilityType()
    {

      try {
        //code...
        $query = FacilityType::all();
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
        Facility::create([
          'name' => $param['name'],
          'facility_type_id' => $param['type'],
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
      //
      try {
        //code...
        $query = Facility::find($id);
        return new FacilityOneCollection($query);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
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
        Facility::find($id)->update($param);
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      try {
        Factory::find($id)->delete();
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
        ], 500);
      }
      return response()->json([
        'success'=> true
      ], 200);
    }
}
