<?php
  
  namespace App\Http\Controllers;

  use Carbon\Carbon;
  
  use App\Models\Order\Order;
  use App\Models\Order\SalesOrder;
  use App\Models\Order\PurchaseOrder;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\Order as OrderOneCollection;
  use App\Http\Resources\Order\OrderCollection;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Validator;
  
  class OrderController extends Controller
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
        $query = Order::all();
        return new OrderCollection($query);
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
    public function store(Request $request, SalesOrder $sales_order, PurchaseOrder $purchase_order)
    {
        $orderData = $request->all()['data']['order'];
        $orderValidator = $request->orderValidator($orderData);

        if ($orderValidator->fails()) {
            return response()->json(
                [
                    'success' => false,
                    'errors' => $orderValidator->fails()
                ],
                400
            );
        }

        try {
            $order = new Order;
            $sales_order = new SalesOrder;
            $purchase_order = new PuchaseOrder;

            $order->
            $order->saveOrFail();

            if ($orderData['type'] === 'sales_oder') {
                $sales_order->fill($order->id);
                $sales_order->saveOrFail();
            }

            if ($$orderData['type'] === 'purchase_oder') {
                $purchase_order->fill($order->id);
                $purchase_order->saveOrFail();
            }

        } catch (Exception $e) {
            return response()->json(
                [
                    'success' =>  false,
                    'errors' => $e->getMessage()
                ],
                500
            );
            //throw $th;
        }

        return response()->json(['success'=>true]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order\Order  $X
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
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
    public function update(Request $request, X $x)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy(X $x)
    {
        //
    }

    /**
     * Validate course param.
     * @param  Array  $data
     */
    public function orderValidator($data)
    {
        return Validator::make($data, [
            'order_type_id' => 'required|interger',
            'creation_time' => 'required',
            'update_time' => 'required'
        ]);
    }

    // public function salesOrderStore($data){}

  }
