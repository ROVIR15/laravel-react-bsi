<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  use Faker\Generator as Faker;

  use App\Models\Order\Order;
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
        $query = PurchaseOrder::all();

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
    public function store(Faker $faker)
    {
      try {
        //Order Creation
        $order = Order::create([
          'id' => $faker->unique()->numberBetween(1, 9999),
          'creation_time' => Carbon::now(),
          'update_time' => Carbon::now()
        ]);

        $purchaseOrder = PurchaseOrder::create([
          'id' => $faker->unique()->numberBetween(1, 3123),
          'order_id' => $order->id
        ]);

        //Update order_id on Sales Order Resource
        $order->find($order->id)->update([ 'purchase_order_id' => $purchaseOrder->id]);

        return response()->json([ 'test' => 'yo' ]);

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
