<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  

  use App\Models\Inventory\GoodsReceiptItems;
  use App\Models\Inventory\GoodsReceipt;
  use App\Models\Inventory\Inventory;
  use App\Models\Inventory\GRView;
  use App\Models\Inventory\GRItemView;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Inventory\GoodsReceiptCollection;
  use App\Http\Resources\Inventory\GoodsReceipt as oneGoodsReceipt;
  use App\Http\Resources\Inventory\GRView as oneGoodsReceiptView;
  use App\Http\Resources\Inventory\GRViewCollection;
  use Illuminate\Http\Request;
  
  class GoodsReceiptController extends Controller
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
        $query = GoodsReceipt::with('items', 'facility', 'party')->get();

        return response()->json([
          'data' => $query
        ]);
        // return new GoodsReceiptCollection($query);
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
        //Goods Receipt Creation
        $goodsReceipt = GoodsReceipt::create([
            'party_id' => $param['supplier'],
            'facility_id' => $param['facility_id']
        ]);

        //Create purchase order item
        $GRItems = [];

        foreach($param['GR_items'] as $key){
          array_push($GRItems, [
            'goods_receipt_id' => $goodsReceipt->id,
            'product_feature_id' => $key['product_feature_id'],
            'qty_received' => $key['qty_received'],
            'qty_on_receipt' => $key['qty_on_receipt']
          ]);
        }

        GoodsReceiptItems::insert($GRItems);

        // Move In
        $movement_in = [];

        foreach($param['GR_items'] as $key){
          array_push($movement_in, [
            'product_feature_id' => $key['product_feature_id'],
            'facility_id' => $param['facility_id'],
            'qty_on_hand' => $key['qty_received']
          ]);
        }

        Inventory::insert($movement_in);

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
        $GoodsReceiptData = GoodsReceipt::with('party', 'items', 'facility')->find($id);
        // return new oneGoodsReceiptView($GoodsReceiptData);
        return response()->json([
          'data' => $GoodsReceiptData
        ]);
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
        // $GoodsReceipt = GoodsReceipt::destroy($id);
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
