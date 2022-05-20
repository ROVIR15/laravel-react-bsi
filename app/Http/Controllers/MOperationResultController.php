<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\ManufactureOperation;
use App\Models\Manufacture\OperationResult;
use App\Http\Resources\Manufacture\MOResult;
use App\Http\Resources\Manufacture\MOResultCollection;

class MOperationResultController extends Controller
{
    //
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = OperationResult::all();

        return new MOResultCollection($query);
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
            OperationResult::create([
                'manufacture_operation_id' => $param['manufacture_operation_id'],
                'party_id' => $param['party_id'],
                'qty_produced' => $param['qty_produced']
            ]);

        } catch (Exception $e) {
          //throw $th;
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
            ], 200
        );
  
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($manufacture_operation_id)
    {
        try {
            //code...
            $query = OperationResult::with('party')->where('manufacture_operation_id', $manufacture_operation_id)->get();

            return new MOResultCollection($query);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
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
            //code...
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
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
    public function destroy($id)
    {
        try {

        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
            ]);
        }
        return response()->json([
            'success' => true
        ]);
    }
}
