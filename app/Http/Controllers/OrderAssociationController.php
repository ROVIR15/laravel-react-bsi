<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Order\OrderAssociation;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\OrderAssociation as OrderAssociationOneCollection;
  use App\Http\Resources\Order\OrderAssociationCollection;
  use Illuminate\Http\Request;
  
  class OrderAssociationController extends Controller
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
      try {

        if(empty($param)){
          $data = OrderAssociation::all();
          return new OrderAssociationCollection($data);
        }

        if(!empty($param['sales_order_id'])) {
          $data = OrderAssociation::where('sales_order_id', $param['sales_order_id'])->get();
          return new OrderAssociationCollection($data);
        }

        if(!empty($param['purchase_order_id'])) {
          $data = OrderAssociation::where('purchase_order_id', $param['purchase_order_id'])->get();
          return new OrderAssociationCollection($data);
        }
      } catch (Exception $th) {
          return response()->json([
            'success' => false,
            'errors' => $th->getMessage()
          ]);
      }
    }

        /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $orderAsscData = $request->all()['payload'];
      
      try {
        OrderAssociation::create($orderAsscData);
      } catch (Exception $th) {
          //throw $th;
        return response()->json([ 'success' => false, 'errors' => $th], 500);
      }

      return response()->json([ 'success' => true], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {

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
    public function update(Request $request, OrderAssociation $orderAssc)
    {
      $orderAsscData = $request->all();
      try {
        if(!empty($orderAssociationData['sales_order_id'])) {
          OrderAssociation::where($orderAsscData['sales_order_id'])->update($orderAsscData['payload']['new_data']);
        }

        if(!empty($orderAssociationData['purchase_order_id'])) {
          OrderAssociation::find($orderAsscData['purchase_order_id'])->update($orderAsscData['payload']['new_data']);
        }
      } catch (Exception $th) {
          return response()->json([
            'success' => false,
            'errors' => $th->getMessage()
          ], 500);
      }

      return response()->json([
        'success' => true
      ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
      $orderAsscData = $request->all();
      try {
        if(!empty($orderAssociationData['sales_order_id'])) {
          OrderAssociation::find($orderAssociationData['sales_order_id']);
        }

        if(!empty($orderAssociationData['purchase_order_id'])) {
          OrderAssociation::find($orderAssociationData['purchase_order_id']);
        }
      } catch (Exception $th) {
          return response()->json([
            'success' => false,
            'errors' => $th->getMessage()
          ], 500);
      }

        return response()->json([
          'success' => true
        ], 200);
      }
  }
