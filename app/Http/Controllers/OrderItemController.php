<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Order\OrderItem;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\OrderItemCollection;
  use App\Http\Resources\Order\OrderItem as oneOrderItem;
  use Illuminate\Http\Request;
  
  class OrderItemController extends Controller
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
        $query = OrderItem::all();

        return new OrderItemCollection($query);
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
      $orderItemData = $request->all()['payload'];
      try {
        $orderItem = OrderItem::insert($orderItemData);

        return response()->json([ 'test' => true ]);

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
        $orderItem = OrderItem::find($id);
        return new oneOrderItem($orderItem);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
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
    public function update($orderId, Request $request)
    {
      $orderItemData = $request->all()['payload'];
      try {
        $orderItem = SalesOrder::where('order_id', $orderId)->update($orderItemData);

        return response()->json([
          'success' => true
        ], 200);
      } catch (Exception $e) {
        //throw $th;
        return response()->json([
          'success' => false,
          'errors' => $e->getMessage()
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
        OrderItem::destroy($id);
        return response()->json([ 'test' => 'yo']);

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
  }
