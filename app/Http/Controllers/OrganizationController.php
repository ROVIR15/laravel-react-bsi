<?php

namespace App\Http\Controllers;

use Faker\Generator as Faker;

use Illuminate\Http\Request;
use App\Models\Party\Organization;
use App\Models\Party\Party;
use App\Http\Controllers\Controller;
use App\Http\Resources\Party\Organization as OrganizationOneCollection;
use App\Http\Resources\Party\OrganizationCollection;

class OrganizationController extends Controller
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
      $query = new Organization();

      return new OrganizationCollection($query);
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
        $query = Organization::create([
          'id' => $faker->unique()->numberBetween(1,2314)
        ]);
        Party::create([
          'id' => $faker->unique()->numberBetween(1,89833),
          'person_id' => $query['person_id']
        ]);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
        ], 500);
      }
      return response()->json([
        'success'=> true,
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
        $query = Person::find($id);
        return new OrganizationOneCollection($query);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
        ], 500);
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
        Party::where('organization_id', $id)->update($param);
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
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy(X $x)
    {
      try {
        Party::where('person_id', $id)->delete();
      } catch (\Throwable $th) {
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
