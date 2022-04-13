<?php
  
  namespace App\Http\Controllers;
  
  use Faker\Generator as Faker;
  use Carbon\Carbon;

  use App\Models\Manufacture\BOM;
  use App\Models\Manufacture\Operation;
  use App\Models\Manufacture\BOMItem;

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
    public function store(Request $request, Faker $faker)
    {
        $param = $request->all()['payload'];
        $current_date_time = Carbon::now()->toDateTimeString();

        try {
            $bom_id = $faker->unique()->numberBetween(1, 9999);
            //BOM Creation
            $billOfMaterial = BOM::create([
              'id' => $bom_id,
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
                'id' => $faker->unique()->numberBetween(1,8939),
                'bom_id' => $bom_id,
                'product_feature_id' => $key['id'],
                'qty' => $key['qty'],
                'created_at' => $current_date_time
              ]);
            }
    
            BOMItem::insert($bomItemsCreation);

            $operationsCreation = [];

            foreach($param['operations'] as $key){
                array_push($operationsCreation, [
                  'id' => $faker->unique()->numberBetween(1,8939),
                  'name' => $key['name'],
                  'seq' => $key['seq'],
                  'work_center_id' => $key['work_center_id'],
                  'bom_id' => $bom_id,
                  'created_at' => $current_date_time
                ]);
            }

            Operation::insert($operationsCreation);
    
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
            $query = BOM::with('product_info', 'operation')->find($id);
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
