<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  

  use App\Models\Inventory\GoodsReceiptItems;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Inventory\GoodsReceiptItemsCollection;
  use App\Http\Resources\Inventory\GoodsReceiptItems as oneGoodsReceiptItems;
  use Illuminate\Http\Request;
  
  class GRItemsController extends Controller
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
        $query = GoodsReceiptItems::all();

        return new GoodsReceiptItemsCollection($query);
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
        //Create purchase order item
        $GRItems = [];

        foreach($param as $key){
          array_push($GRItems, [
            'goods_receipt_id' => $key['goods_receipt_id'],
            'order_item_id' => $key['order_item_id'],
            'qty_received' => $key['qty_received'],
            'qty_on_receipt' => $key['qty_on_receipt']
          ]);
        }

        GoodsReceiptItems::insert($GRItems);

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
        $GoodsReceiptData = GoodsReceiptItems::find($id);
        return new oneGoodsReceiptItems($GoodsReceiptData);
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
        $GoodsReceipt = GoodsReceiptItems::find($id)->update($GoodsReceiptData);

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
        GoodsReceiptItems::destroy($id);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
      return response()->json([
        'success' => true,
      ], 200);
    }
  }
