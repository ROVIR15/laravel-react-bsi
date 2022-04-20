<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  use Faker\Generator as Faker;

  use App\Models\Order\Order;
  use App\Models\Order\OrderItem;
  use App\Models\Order\PurchaseOrder;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\PurchaseOrderCollection;
  use App\Http\Resources\Order\PurchaseOrder as onePurchaseOrder;
  use Illuminate\Http\Request;
  
  class PurchaseOrderController extends Controller
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
        $query = PurchaseOrder::with('order_item', 'product_feature')->get();

        return new PurchaseOrderCollection($query);
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
      
      try {
        //Order Creation
        $order = Order::create([
          'id' => $faker->unique()->numberBetween(1, 9999),
          'quote_id' => $param['quote_id'],
          'issue_date' => $param['issue_date'],
          'valid_thru' => $param['valid_thru']
        ]);

        $purchaseOrder = PurchaseOrder::create([
          'id' => $faker->unique()->numberBetween(1, 3123),
          'order_id' => $order->id,
          'po_number' => $param['po_number'],
          'bought_from' => $param['party_id'],
          'issue_date' => $param['issue_date'],
          'delivery_date' => $param['delivery_date'],
          'valid_thru' => $param['valid_thru']
        ]);

        //Update order_id on Sales Order Resource
        $order->find($order->id)->update([ 'purchase_order_id' => $purchaseOrder->id]);

        //Create purchase order item
        $purchaseItemsCreation = [];

        foreach($param['order_items'] as $key){
          array_push($purchaseItemsCreation, [
            'id' => $faker->unique()->numberBetween(1,8939),
            'order_id' => $order->id,
            'product_feature_id' => $key['product_feature_id'],
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'shipment_estimated' => date('Y-m-d', strtotime($key['delivery_date']))
          ]);
        }

        OrderItem::insert($purchaseItemsCreation);

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
        $purchaseOrderData = PurchaseOrder::find($id);
        return new onePurchaseOrder($purchaseOrderData);
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
      $purchaseOrderData = $request->all()['payload'];
      try {
        $purchaseOrder = PurchaseOrder::find($id)->update($purchaseOrderData);

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
        $purchaseOrder = PurchaseOrder::destroy($id);
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
