<?php
  
  namespace App\Http\Controllers;
  
  
  use Carbon\Carbon;

  use App\Models\Manufacture\BOMService;

  use App\Http\Resources\Manufacture\BOMService as BOMServiceOneCollection;
  use App\Http\Resources\Manufacture\BOMServiceCollection;

  use Illuminate\Http\Request;
  
  class BOMServiceController extends Controller
  {  
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = BOMService::with('product')->get();

        return new BOMServiceOneCollection($query);
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
  
            $bomServiceCreation = [];
      
            foreach($param as $key){
              array_push($bomServiceCreation, [
                'bom_id' => $key['bom_id'],
                'product_id' => $key['product_id'],
                'unit_price' => $key['unit_price'],
              ]);
            }
    
            BOMService::insert($bomServiceCreation);
  
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
    public function show($bomId)
    {
        try {
            //code...
            $query = BOMService::with('product')->where('bom_id', $bomId)->get();
            return new BOMServiceCollection($query);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
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
        $param = $request->all()['payload'];
        try {
            //code...
            $query = BOMService::find($id)->update($param);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
            ]);
        }
        return response()->json([
            'success' => true
        ]);
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
            BOMService::find($id)->delete();

        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'err' => $th->getMessage()
            ]);
        }
        return response()->json([
            'success' => true
        ]);
    }
  }
