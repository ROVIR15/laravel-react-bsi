<?php
  
  namespace App\Http\Controllers;
  
  use Faker\Generator as Faker;
  use App\Models\Order\OrderStatus;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\OrderStatusCollection;
  use App\Http\Resources\Order\OrderStatus as OrderStatusOneCollection;
  use Illuminate\Http\Request;
  
  class OrderStatusController extends Controller
  {  
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = OrderStatus::all();

        return new OrderStatusCollection($query);
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
      $orderStatusData = $request->all()['payload'];
      try {
        OrderStatus::create([
          'id' => $faker->unique()->numberBetween(78,7933),
          'order_id' => $orderStatusData['order_id'],
          'status_type' => $orderStatusData['status_type']
        ]);
      } catch (Exception $th) {
        return response()->json([ 'success' => false, 'errors' => $th->getMessage()], 500);
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
        $orderStatusData = OrderStatus::find($id);
        return new OrderStatusOneCollection($orderStatusData);

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
      $orderStatusData = $request->all()['payload'];

      try {
        if(empty($id)) return response()->json([ 'success' => false, 'errors' => 'id not found']);
        OrderStatus::find($id)->update($orderStatusData);
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
    public function destroy($id)
    {
      try {
        OrderStatus::find($id)->delete();
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
