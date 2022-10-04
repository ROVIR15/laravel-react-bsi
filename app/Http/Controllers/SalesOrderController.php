<?php
  
  namespace App\Http\Controllers;
  
  use Carbon\Carbon;
  

  use App\Models\Order\Order;
  use App\Models\Order\OrderStatus;
  use App\Models\Order\OrderItem;
  use App\Models\Order\SalesOrder;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\SalesOrder as oneSalesOrder;
  use App\Http\Resources\Order\SalesOrderCollection;
  use App\Http\Resources\Order\SOView as oneSalesOrderView;
  use App\Http\Resources\Order\SOViewCollection;
  use Illuminate\Http\Request;

  class SalesOrderController extends Controller
   {

    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $query;
      $level = $request->query('level');
      
      switch ($level) {
        case 'approve':
          # code...
          $query = SalesOrder::with('status', 'sum')->whereHas('order', function($query2){
            $query2->whereHas('status', function($query3){
              $query3->whereIn('status_type', ['Approve', 'Review', 'Reject Approve']);
            });
          })->get();
          break;

        case 'review':
          # code...
          $query = SalesOrder::with('sum')->whereHas('order', function($query2){
            $query2->whereHas('status', function($query3){
              $query3->whereIn('status_type', ['Review', 'Submit', 'Reject Review']);
            });
          })->get();
          break;
        
        default:
          # code...
          $query = SalesOrder::with('status', 'sum')->get();
          break;
      }

      return new SOViewCollection($query);
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
        //Order Creation
        $order = Order::create([
          'quote_id' => $param['quote_id']
        ]);

        $salesOrder = SalesOrder::create([
          'order_id' => $order->id,
          'quote_id' => $param['quote_id'],
          'po_number' => $param['po_number'],
          'sold_to' => $param['sold_to'],
          'ship_to' => $param['ship_to'],
          'delivery_date' => $param['delivery_date'],
          'issue_date' => $param['issue_date'],
          'valid_thru' => $param['valid_thru']
        ]);

        //Update order_id on Sales Order Resource
        $order->find($order->id)->update([ 'sales_order_id' => $salesOrder->id]);

        $salesItemsCreation = [];
  
        foreach($param['order_items'] as $key){
          array_push($salesItemsCreation, [
            'order_id' => $order['id'],
            'product_feature_id' => $key['product_feature_id'],
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'shipment_estimated' => date('Y-m-d', strtotime($key['shipment_estimated']))
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
        $salesOrder = SalesOrder::with('party', 'order_item', 'ship', 'status')->find($id);
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
        SalesOrder::find($id)->update($salesOrderData);
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