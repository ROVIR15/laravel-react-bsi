<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Study\TermType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Study\TermType as TermTypeOneCollection;
use App\Http\Resources\Study\TermTypeCollection;

class TermTypeController extends Controller
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
      $query = TermType::all();

      return new TermTypeCollection($query);
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
        TermType::create([
          'production_study_id' => $param['production_study_id'],
          'party_id' => $param['party_id']
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
        $query = TermType::find($id);
        return new TermTypeCollection($query);
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
        TermType::find($id)->update($param);
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
        TermType::find($id)->delete();
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
