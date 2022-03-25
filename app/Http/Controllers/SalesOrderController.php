<?php
  
  namespace App\Http\Controllers;
  
  use Carbon\Carbon;
  use Faker\Generator as Faker;

  use App\Models\Order\Order;
  use App\Models\Order\SalesOrder;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\SalesOrder as oneSalesOrder;
  use App\Http\Resources\Order\SalesOrderCollection;
  use Illuminate\Http\Request;

  class SalesOrderController extends Controller
   {

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $query = SalesOrder::with('order_item', 'product_feature')->get();

      return new SalesOrderCollection($query);
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

        $salesOrder = SalesOrder::create([
          'id' => $faker->unique()->numberBetween(1, 3123),
          'order_id' => $order->id
        ]);

        //Update order_id on Sales Order Resource
        $order->find($order->id)->update([ 'sales_order_id' => $salesOrder->id]);

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
        $salesOrder = SalesOrder::find($id);
        return new oneSalesOrder($salesOrder);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
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
      $salesOrderData = $request->all()['payload'];
      try {
        return response()->json([
          'success' => true
        ], 200);
      } catch (Exception $e) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
        ],500);
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
        SalesOrder::find($id)->delete();
        return response()->json([ 'success'=> true ]);
      } catch (Exception $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ]);
      }
    }

    /**
     * Validate sales-order param.
     * @param  Array  $data
     */
    // public function salesOrderValidator($data)
    // {
    //     return Validator::make($data, [
    //         'order_id' => 'required'
    //     ]);
    // }



  }

?>