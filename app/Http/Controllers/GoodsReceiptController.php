<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  use Faker\Generator as Faker;

  use App\Models\Order\GoodsReceiptItems;
  use App\Models\Order\GoodsReceipt;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\GoodsReceiptCollection;
  use App\Http\Resources\Order\GoodsReceipt as oneGoodsReceipt;
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
        $query = GoodsReceipt::all();

        return new GoodsReceiptCollection($query);
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
            'purchase_order_id' => $param['purchase_order_id']
        ]);

        //Create purchase order item
        $GRItems = [];

        foreach($param['GR_items'] as $key){
          array_push($GRItems, [
            'order_id' => $goodsReceipt->id,
            'product_feature_id' => $key['product_feature_id'],
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'shipment_estimated' => date('Y-m-d', strtotime($key['delivery_date']))
          ]);
        }

        GoodsReceiptItems::insert($purchaseItemsCreation);

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
        $GoodsReceiptData = GoodsReceipt::find($id);
        return new oneGoodsReceipt($GoodsReceiptData);
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
        $GoodsReceipt = GoodsReceipt::destroy($id);
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
