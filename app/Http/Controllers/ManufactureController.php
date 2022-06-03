<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Manufacture\Manufacture;
use App\Models\Manufacture\ManufactureView;
use App\Models\Manufacture\ManufactureOperation;
use App\Models\Manufacture\ManufactureComponent;
use App\Models\Manufacture\ManufactureHasBOM;
use App\Http\Resources\Manufacture\ManufactureShow as ManufactureShowOneCollection;
use App\Http\Resources\Manufacture\Manufacture as ManufactureOneCollection;
use App\Http\Resousrces\Manufacture\ManufactureCollection;
use App\Http\Resources\Manufacture\ManufactureView as ManufactureViewOneCollection;
use App\Http\Resources\Manufacture\ManufactureViewCollection;

class ManufactureController extends Controller
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
        $query = ManufactureView::all();

        return new ManufactureViewCollection($query);
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

        $stored2 = Manufacture::create([
          'party_id' => NULL,
          'qty' => $param['qty'],
          'start_date' => $param['start_date'],
          'end_date' => $param['end_date']
        ]);

        ManufactureHasBOM::create([
          'bom_id' => $param['bom_id'],
          'manufacture_id' => $stored2->id
        ]);

        $operationPayload = [];
        
        $componentsPayload = [];

        foreach ($param['operations'] as $item) {
          # code...
          $temp = [
            'manufacture_id' => $stored2->id,
            'operation_id' => $item['id']    
          ];

          array_push($operationPayload, $temp);
        }

        foreach ($param['components'] as $item) {
          # code...
          $temp = [
            'manufacture_id' => $stored2->id,
            'product_feature_id' => $item['product_feature_id'],
            'qty_keep' => 0,
            'qty_to_be_consumed' => $item['qty_to_be_consumed']
          ];

          array_push($componentsPayload, $temp);
        }

        ManufactureOperation::insert($operationPayload);
        ManufactureComponent::insert($componentsPayload);

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
        $query = Manufacture::with(
            'bom',
            'operation',
            'component',
            'logs'
        )->where('id', $id)->get();
        // return response()->json($query);
        return new ManufactureOneCollection($query[0]);
    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
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
      $GoodsReceiptData = $request->all()['payload'];
      try {
        $GoodsReceipt = GoodsReceipt::find($id)->update($GoodsReceiptData);

        return response()->json([
          'success' => true
        ], 200);
      } catch (Exception $th) {
          //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
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
        $GoodsReceipt = Manufacture::destroy($id);
        return response()->json([
          'success' => true,
        ], 200);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }    
}
