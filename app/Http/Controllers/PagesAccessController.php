<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\UserManagement\Pages;
use App\Models\General\PagesAccess;

class PagesAccessController extends Controller
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
      $query = PagesAccess::orderBy('users_id')->with('user', 'page')->get();

      return response()->json($query);
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
        $query = PagesAccess::create([
          'name' => $param['name'],
          'users_id' => $param['user_id'],
          'pages_id' => $param['pages_id'],
          'insert' => $param['insert'],
          'edit' => $param['edit'],
          'delete' => $param['delete']
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
        $query = PagesAccess::where('users_id', $id)->orderBy('users_id')->with('user', 'page')->get();
        return response()->json($query);
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
        PagesAccess::find($id)->update($param);
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
    public function destroy($id)
    {
      try {
        PagesAccess::find($id)->delete();
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
