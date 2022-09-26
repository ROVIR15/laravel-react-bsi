<?php
  
  namespace App\Http\Controllers;
  
  
  use Carbon\Carbon;

  use App\Models\Manufacture\BOM;
  use App\Models\Manufacture\Operation;
  use App\Models\Manufacture\BOMItem;
  use App\Models\Manufacture\BOMService;

  use App\Http\Resources\Manufacture\BOM as BOMOneCollection;
  use App\Http\Resources\Manufacture\BOMCollection;

  use Illuminate\Http\Request;
  
  class BOMController extends Controller
  {  
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = BOM::all();

        return new BOMCollection($query);
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
            //BOM Creation
            $billOfMaterial = BOM::create([
              'product_id' => $param['product_id'],
              'product_feature_id' => $param['product_feature_id'],
              'name' => $param['name'],
              'qty' => $param['qty'],
              'start_date' => $param['start_date'],
              'end_date' => $param['end_date'],
              'company_name' => $param['company_name']
            ]);
    
            $bomItemsCreation = [];
      
            foreach($param['components'] as $key){
              array_push($bomItemsCreation, [
                'bom_id' => $billOfMaterial['id'],
                'product_feature_id' => $key['id'],
                'qty' => floatval($key['consumption']) + floatval($key['allowance']),
                'consumption' => $key['consumption'],
                'allowance' => $key['allowance'],
                'unit_price' => $key['unit_price'],
              ]);
            }
    
            BOMItem::insert($bomItemsCreation);

            $operationsCreation = [];

            foreach($param['operations'] as $key){
                array_push($operationsCreation, [
                  'name' => $key['name'],
                  'seq' => $key['seq'],
                  'work_center_id' => $key['work_center_id'],
                  'bom_id' => $billOfMaterial['id'],
                  'created_at' => $current_date_time
                ]);
            }

            Operation::insert($operationsCreation);

            $servicesCreation = [];

            foreach($param['services'] as $key){
                array_push($servicesCreation, [
                  'product_id' => $key['product_id'],
                  'bom_id' => $billOfMaterial['id'],
                  'unit_price' => $key['unit_price'],
                ]);
            }

            BOMService::insert($servicesCreation);
    
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
            //code...
            $query = BOM::with('bom_items', 'bom_services', 'operation', 'product', 'variant')->find($id);
            return new BOMOneCollection($query);
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
            $query = BOM::find($id)->update($param);
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
            BOM::find($id)->delete();
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
