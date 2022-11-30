<?php
  
  namespace App\Http\Controllers;
  
  
  use Carbon\Carbon;

  use DB;

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
    public function index(Request $request)
    {
      $query;
      $level = $request->query('level');
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');
      $monthYear = $request->query('monthYear');
      
      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("8 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      if(empty($monthYear)){
        $monthYear = date('Y-m');
      }

      $monthYear = date_create($monthYear);
      $month = date_format($monthYear, 'm');
      $year = date_format($monthYear, 'Y');

      switch ($level) {
        case 'approve':
          # code...
          $query = BOM::with('party')->whereHas('status', function($query3){
              $query3->whereIn('status_type', ['Approve', 'Review', 'Reject Approve', 'Reject Review']);
          })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;

        case 'review':
          # code...
          $query = BOM::with('party')->whereHas('status', function($query3){
              $query3->whereIn('status_type', ['Review', 'Submit', 'Reject Review']);
          })
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;
        
        default:
          # code...
          $query = BOM::with('status', 'party')
          ->whereYear('created_at', '=', $year)
          ->whereMonth('created_at', '=', $month)
          ->get();
          break;
      }

      // return response()->json([$query, $thruDate, $fromDate]);
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

    public function getBOMMaterials() {
      try {
        $query = BOM::select('id', 'name')
        ->with(['bom_items' => function ($query){
          return $query->select('id', 'bom_id', 'product_feature_id', 'qty', 'consumption', 'allowance', 'unit_price');
        }])->get();
        
      } catch (\Throwable $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
        'data' => $query
      ]);
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
              'party_id' => $param['party_id'],
              'name' => $param['name'],
              'qty' => $param['qty'],
              'margin' => $param['margin'],
              'tax' => $param['tax'],
              'starting_price' => $param['starting_price'],
              'start_date' => $param['start_date'],
              'end_date' => $param['end_date'],
              'company_name' => $param['company_name']
            ]);
    
            if(!is_array($param['components']) && count($param['components']) === 0) {
                throw new Exception("Not found");
            }

            $bomItemsCreation = [];
      
            foreach($param['components'] as $key){
              array_push($bomItemsCreation, [
                'bom_id' => $billOfMaterial['id'],
                'product_feature_id' => $key['product_feature_id'],
                'qty' => floatval($key['consumption']) + floatval($key['allowance']),
                'consumption' => $key['consumption'],
                'allowance' => $key['allowance'],
                'unit_price' => $key['unit_price'],
              ]);
            }
    
            BOMItem::insert($bomItemsCreation);


            if(!is_array($param['services']) && count($param['services']) === 0) {
              throw new Exception("Not found");
            }

            $servicesCreation = [];

            foreach($param['services'] as $key){
                array_push($servicesCreation, [
                  'product_id' => $key['product_id'],
                  'bom_id' => $billOfMaterial['id'],
                  'unit_price' => $key['unit_price'],
                ]);
            }

            BOMService::insert($servicesCreation);

            if(!is_array($param['operations']) && count($param['operations']) === 0) {
                throw new Exception("Not found");
            }

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
            $query = BOM::with(
              'bom_items', 
              'bom_services', 
              'operation', 
              'product', 
              'variant', 
              'status', 
              'party')
              ->find($id);
            return new BOMOneCollection($query);
        } catch (Throwable $th) {
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
