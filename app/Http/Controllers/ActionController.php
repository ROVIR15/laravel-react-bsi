<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\Action;
use App\Models\Manufacture\ManufactureOperationActionView;
use App\Http\Resources\Manufacture\Action as ActionOneCollection;
use App\Http\Resources\Manufacture\ActionCollection;

class ActionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $param = $request->all()['manufacture_operation'];
      $query = ManufactureOperationActionView::where('manufacture_operation_id', $param)->orderBy('time', 'desc')->get();

      return new ActionCollection($query);
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
        $params = $request->all()['payload'];

        try {
            Action::create([
              'manufacture_operation_id' => $params['manufacture_operation_id'],
              'action_type_id' => $params['action_type_id']
            ]);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
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
    public function show(X $x)
    {
        //
        $param = $request->all()['manufacture_operation'];

        try {
            //code...
            $query = Action::where('manufacture_operation_id', $param)->get();

            return response()->json($query);
        } catch (Exception $th) {
            //throw $th;
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
    public function update(Request $request, X $x)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy(X $x)
    {
        //
    }
}
