<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Facility\Factory;
use App\Models\Facility\FactoryHasFacility;
use App\Models\Facility\FacilityType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Facility\FacilityCollection;
use App\Http\Resources\Facility\Facility as FacilityOneCollection;

class FactoryController extends Controller
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
        $query = Factory::all();
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
        $factory = Factory::create([
          'name' => $param['name'],
          'description' => $param['description']
        ]);

        $facilities = [];

        if(!isset($factory)) throw new Error('failed to store factory');
        if(!isset($param['facilities'])) {
          return response()->json([
            'success' => true
          ]);
        }

        foreach ($param['facilities'] as $key) {
          # code...
          array_push(facilities, [
            'factory_id' => $factory->id,
            'facility_id' => $key[facility_id]
          ]);
        }

        FactoryHasFacility::insert($facilities);
        
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
     * Store a newly facility on factory resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function insertNewFacilityToFactory(Request $request)
    {
      $param = $request->all()['payload'];

      try {
        // $facilities = [];
        // if(sizeOf(params)){
        //   foreach ($param as $key) {
        //     # code...
        //     array_push(facilities, [
        //       'factory_id' => $factory->id,
        //       'facility_id' => $key[facility_id]
        //     ]);
        //   }
        // } else {
        //   throw new Exception("Error Processing Request", 1);
        // }

        FactoryHasFacility::create([
          'factory_id' => $param['factory_id'],
          'facility_id' => $param['facility_id']
        ]);

      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage(),
          'data' => $param
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
    public function destroyFacilityFactory($id)
    {
      try {
        FactoryHasFacility::where($id)->delete();
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
          $query = Factory::with('items')->find($id);
          return response()->json([
            'success' => true,
            'data' => $query
          ]);

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
        Factory::find($id)->update($param);
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
