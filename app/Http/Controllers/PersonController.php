<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;
use App\Models\Party\Person;
use App\Models\Party\Party;
use App\Http\Controllers\Controller;
use App\Http\Resources\Party\Person as PersonOneCollection;
use App\Http\Resources\Party\PersonCollection;

class PersonController extends Controller
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
      $query = new Person();

      return new PersonCollection($query);
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
        $person = Person::create([]);

        Party::create([
          'person_id' => $param['person_id']
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
        return new PersonOneCollection($query);
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
        Person::find($id)->update($param);
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
        Person::find($id)->delete();
        Party::where('person_id', $id)->delete();
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
