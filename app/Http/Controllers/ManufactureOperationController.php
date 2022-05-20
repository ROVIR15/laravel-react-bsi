<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\ManufactureOperation;
use App\Http\Resources\Manufacture\ManufactureOperation as ManufactureOperationOneCollection;
use App\Http\Resources\Manufacture\ManufactureOperationCollection;
use App\Http\Resources\Manufacture\OperationResult as OperationResultOneCollection;
use App\Http\Resources\Manufacture\OperationResultCollection;

class ManufactureOperationController extends Controller
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
        $query = ManufactureOperation::with('result', 'operation', 'manufacture')->get();

        return new OperationResultCollection($query);
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
    public function store(Request $request, Faker $faker)
    {
        $param = $request->all()['payload'];
        $current_date_time = Carbon::now()->toDateTimeString();

        try {
  
            $bomItemsCreation = [];
      
            foreach($param as $key){
              array_push($bomItemsCreation, [
                'id' => $faker->unique()->numberBetween(1,8939),
                'bom_id' => $key['bom_id'],
                'product_feature_id' => $key['product_feature_id'],
                'qty' => $key['qty'],
                'created_at' => $current_date_time
              ]);
            }
    
            BOMItem::insert($bomItemsCreation);
  
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
            'success' => true
          ], 200
        );
  
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
            //code...
            $query = ManufactureOperation::with('result', 'operation')->find($id);
            return new OperationResultOneCollection($query);
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
            $query = BOMItem::find($id)->update($param);
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
            BOMItem::find($id)->delete();
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
