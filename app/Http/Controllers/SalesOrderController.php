<?php
  
  namespace App\Http\Controllers;
  
  use Carbon\Carbon;
  use DB;  
  use PDF;

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
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');
      $monthYear = $request->query('monthYear');
      $completion_status = $request->query('completion_status');

      if(empty($level)){
        if(!empty($completion_status) && $completion_status = 2){
          $query = SalesOrder::with('completion_status')->whereHas('completion_status', function($query2){
            $query2->where('completion_status_id', 2);
          })->get();
        } else {
          $query = SalesOrder::with('status', 'sum', 'completion_status')->get();
        }

        return new SOViewCollection($query);
      }

      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("8 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');
      
      switch ($level) {
        case 'approve':
          # code...
          $query = SalesOrder::with('completion_status', 'status', 'sum')->whereHas('status', function($query2){
            $query2->whereIn('status_type', ['Approve', 'Review', 'Reject Approve']);
          })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;

        case 'review':
          # code...
          $query = SalesOrder::with('completion_status', 'status', 'sum')->whereHas('status', function($query2){
            $query2->whereIn('status_type', ['Review', 'Submit', 'Reject Review']);
          })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;
        
        default:
          # code...
          $query = SalesOrder::with('completion_status', 'status', 'sum')
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;
      }

      return new SOViewCollection($query);
    }

    public function getSalesOrderList()
    {
      try {
        $query = SalesOrder::with('completion_status', 'status', 'sum')->get();
      } catch (\Throwable $th) {
        //throw $th;

        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
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
          'quote_id' => $param['quote_id'],
          'currency_id' => $param['currency_id'],
          'tax' => $param['tax']
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
            'product_id' => $key['product_id'],
            'product_feature_id' => $key['product_feature_id'],
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'cm_price' => $key['cm_price'],
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
        $salesOrder = SalesOrder::with('party', 'order_item', 'ship', 'status', 'completion_status', 'order')->find($id);
        return new oneSalesOrder($salesOrder);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getError()
        ]);
      }
    }

    public function createPDF()
    {
      try {
        //code..
        $salesOrder = SalesOrder::all();

        // $pdf = PDF::loadview('apa.pdf',['order'=>$order]);

        return view('order_pdf',['order'=>$salesOrder]);
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success'=> false,
          'errors'=> $th->getMessage()
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