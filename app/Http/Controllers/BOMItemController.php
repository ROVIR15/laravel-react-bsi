<?php
  
  namespace App\Http\Controllers;
  
  
  use Carbon\Carbon;

  use App\Models\Manufacture\BOMItem;

  use App\Http\Resources\Manufacture\BOMItem as BOMItemOneCollection;
  use App\Http\Resources\Manufacture\BOMItemCollection;

  use Illuminate\Http\Request;
  
  class BOMItemController extends Controller
  {  
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = BOMItem::with('product_feature')->get();

        return new BOMItemCollection($query);
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
        $current_date_time = Carbon::now()->toDateTimeString();

        try {
  
            $bomItemsCreation = [];
      
            foreach($param as $key){
              array_push($bomItemsCreation, [
                'bom_id' => $key['bom_id'],
                'product_feature_id' => $key['product_feature_id'],
                'qty' => $key['qty'],
                'created_at' => $current_date_time
              ]);
            }
    
            BOMItem::insert($bomItemsCreation);
  
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
            $query = BOMItem::with('product_feature')->where('bom_id', $bomId)->get();
            return new BOMItemCollection($query);
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
            $query = BOMItem::find($id)->update($param);
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
            BOMItem::find($id)->delete();
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
