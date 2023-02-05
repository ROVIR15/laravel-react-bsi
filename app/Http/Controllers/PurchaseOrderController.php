<?php
  
  namespace App\Http\Controllers;
  use Carbon\Carbon;
  use DB;

  use Illuminate\Http\Request;
  use App\Models\Invoice\Invoice;
  use App\Models\Order\Quote;
  use App\Models\Order\Order;
  use App\Models\Order\OrderItem;
  use App\Models\Order\PurchaseOrder;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\PurchaseOrderCollection;
  use App\Http\Resources\Order\PurchaseOrder as onePurchaseOrder;
  use App\Http\Resources\Order\POViewCollection;
  use App\Http\Resources\Order\POView as onePurchaseOrderView;

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
      $query;
      $level = $request->query('level');
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');
      $monthYear = $request->query('monthYear');
      $completion_status = $request->query('completion_status');

      if(empty($level)){
        if(!empty($completion_status) && $completion_status = 2){
          $query = PurchaseOrder::with('completion_status')->whereHas('completion_status', function($query2){
            $query2->where('completion_status_id', 2);
          })->get();
        } else {
        $query = PurchaseOrder::with('status', 'sum', 'completion_status')->get();
        }

        return new POViewCollection($query);
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
          $query = PurchaseOrder::with('order', 'completion_status', 'status', 'sum')->whereHas('status', function($query2){
            $query2->whereIn('status_type', ['Approve', 'Review', 'Reject Approve']);
          })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;

        case 'review':
          # code...
          $query = PurchaseOrder::with('order', 'completion_status', 'status', 'sum')->whereHas('status', function($query2){
            $query2->whereIn('status_type', ['Review', 'Submit', 'Reject Review']);
          })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;
        
        default:
          # code...
          $query = PurchaseOrder::with('order', 'completion_status', 'status', 'sum')
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();

          break;
      }

      return new POViewCollection($query);
    }

    public function getPurchaseOrderList()
    {
      try {
        $query = PurchaseOrder::with('completion_status', 'status', 'sum')->get();
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return new POViewCollection($query);
    }

    public function getPurchaseOrderWhereNotInvoicedYet()
    {
      try {
        $orderIdFromInvoice = Invoice::select('order_id')->distinct('order_id')->get();

        $_order = [];
        foreach ($orderIdFromInvoice as $item) {
          if(!is_null($item['order_id'])) array_push($_order, $item['order_id']);
        }
        $query = PurchaseOrder::whereNotIn('order_id', $_order)->get();
      } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'data' => $query
      ]);
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
          'currency_id' => $param['currency_id'],
          'quote_id' => $param['quote_id'],
          'issue_date' => $param['issue_date'],
          'valid_thru' => $param['valid_thru'],
          'tax' => $param['tax'],
          'description' => $param['description']
        ]);

        $purchaseOrder = PurchaseOrder::create([
          'order_id' => $order->id,
          'po_number' => $param['po_number'],
          'bought_from' => $param['sold_to'],
          'ship_to' => $param['ship_to'],
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
            'order_id' => $order->id,
            'product_id' => $key['product_id'],
            'product_feature_id' => $key['product_feature_id'],
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'shipment_estimated' => date('Y-m-d', strtotime($key['delivery_date'])),
            'description' => $key['description']
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
        $purchaseOrderData = PurchaseOrder::with('bought', 'ship', 'order_item', 'order', 'status', 'completion_status')->find($id);
        // return response()->json($purchaseOrderData);
        return new onePurchaseOrder($purchaseOrderData);
    } catch (Throwable $th) {
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
        PurchaseOrder::find($id)->update($purchaseOrderData);
        
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
