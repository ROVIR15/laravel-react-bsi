<?php
  
  namespace App\Http\Controllers;
  
  use App\Models\Order\OrderRole;
  use App\Http\Controllers\Controller;
  use App\Http\Resources\Order\OrderRole as OrderRoleCollection;
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

   }

   /**
    * Display the specified resource.
    *
    * @param  \App\X  $X
    * @return \Illuminate\Http\Response
    */
   public function show(X $x)
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
  }
