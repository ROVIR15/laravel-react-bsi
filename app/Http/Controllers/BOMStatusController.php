<?php
  
  namespace App\Http\Controllers;
  
  
  use App\Models\Manufacture\BOMStatus;
  use App\Http\Controllers\Controller;
  use Illuminate\Http\Request;
  
  class BOMStatusController extends Controller
  {  
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = BOMStatus::all();
        return response()->json($query);
        // return new BOMStatusCollection($query);
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
      $BOMStatusData = $request->all()['payload'];
      try {
        BOMStatus::create([
          'user_id' => $BOMStatusData['user_id'],
          'bom_id' => $BOMStatusData['bom_id'],
          'status_type' => $BOMStatusData['status_type'],
          'unit_price' => $BOMStatusData['final_price'],
          'description' => $BOMStatusData['description']
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
        $BOMStatusData = BOMStatus::find($id);
        // return new BOMStatusOneCollection($BOMStatusData);
        return response()->json($BOMStatusData);

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
      $BOMStatusData = $request->all()['payload'];

      try {
        if(empty($id)) return response()->json([ 'success' => false, 'errors' => 'id not found']);
        BOMStatus::find($id)->update($BOMStatusData);
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
        BOMStatus::find($id)->delete();
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
