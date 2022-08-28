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
      $param = $request->all()['payload'];
      try {

        $salesItemsCreation = [];
  
        foreach($param as $key){
          array_push($salesItemsCreation, [
            
            'order_id' => $key['order_id'],
            'product_feature_id' => $key['product_feature_id'],
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'shipment_estimated' => date('Y-m-d', strtotime('2022-04-03'))
          ]);
        }

        OrderItem::insert($salesItemsCreation);

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
        $orderItem = OrderItem::with('product_feature')->where('order_id', $id)->get();
        return new OrderItemCollection($orderItem);
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
    public function update($id, Request $request)
    {
      $orderItemData = $request->all()['payload'];
      try {
        $orderItem = OrderItem::find($id)->update($orderItemData);

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
