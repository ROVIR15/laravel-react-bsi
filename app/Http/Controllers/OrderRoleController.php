<?php
  
  namespace App\Http\Controllers;
  
  

  use App\Models\Order\OrderRole;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\OrderRoleCollection;
  use App\Http\Resources\Order\OrderRole as OrderRoleOneCollection;
  use Illuminate\Http\Request;
  
  class OrderRoleController extends Controller
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
       $query = new OrderRole();

       return new OrderRoleCollection($query);
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
      $orderRole = $request->all()['payload'];
      try {
        OrderRole::create([
          'order_id' => $orderRole['order_id']
        ]);
      } catch (Exception $th) {
          //throw $th;
          return response()->json([
            'success'=> false,
            'errors'=> $th->getMessage()
          ], 500);
      }

      return response()->json([
        'success' => true,
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
        $data = OrderRole::find($id);
        return new OrderRoleOneCollection($data);
       } catch (Exception $th) {
           //throw $th;
           return response()->json([
            'success'=> false,
            'errors'=> $th->getMessage()
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
      $param = $request->all();
      try {
        OrderRole::find($id)->update($param['payload']);
      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors'=> $th->getMessage()
        ], 500);
      }
      return response()->json([
        'successs'=> true
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
        OrderRole::find($id)->delete();
      } catch (Exception $th) {
          //throw $th;
          return response()->json([
            'success'=> false,
            'errors'=> $th->getMessage()
          ], 500);
      }
      return response()->json([
        'success'=> true,
      ], 200);
   }
  }
