<?php

namespace App\Http\Controllers;

use App\Models\Inventory\GoodsMovement;
use Illuminate\Http\Request;

use App\Models\Monitoring\Qc;
use App\Models\Product\Product;
use App\Models\Product\ProductFeature;
use DB;
use Exception;

class MonitoringQcController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $param = $request->has('sales-order');
      $order_id = $request->query('sales-order');
      $fromDate = $request->query('fromDate');
      $thruDate = $request->query('thruDate');
      $query = [];

      if(empty($fromDate) || empty($thruDate)){
        $thruDate = date('Y-m-d');
        $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
        $fromDate = date_format($fromDate, 'Y-m-d');
      }

      try {
        //code...
        if($param){
          $query = QC::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, sum(qty_loading) as qty_loading, sum(output) as output, sum(reject) as reject')
          ->with('sales_order', 'product_feature')
          ->with(['fg' => function ($query) use ($order_id){
            return $query->where('order_id', $order_id);
          }])
          ->where('order_id', $request->query('sales-order'))
          ->groupBy('order_item_id')
          ->get();

        } else {
          $query = QC::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, sum(qty_loading) as qty_loading, sum(output) as output, sum(reject) as reject')
                  ->groupBy('line', 'date', 'po_number', 'product_feature_id', 'ms_id')
                  ->with('sales_order', 'product_feature')
                  ->orderBy('date', 'desc')
                  ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                  ->get();
        }  
      } catch (Throwable $th) {
        //throw $th;
        return response()->json(['success' => false, 'error' => $th->getMessage()]);
      }

      return response()->json(['data' => $query]);
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
            QC::insert($param);

            foreach ($param as $key) {
              # code...
              $this->goodsMovementRecords($key, 18, $key['output']);
              // $this->goodsMovementRecords($key, $key['facility_id'], $key['output']);
              $this->goodsMovementRecords($key, 4, $key['output'] * -1);
            }      
            
            return response()->json(['success' => true]);
        } catch (Throwable $th) {
            //throw $th;
            return response()->json(
              [
                'success' => false,
                'errors' => $th->getMessage()
              ],
              500
            );
        }
    }

    public function goodsMovementRecords($key, $facility, $output)
    {
      try {
  
        $product_feature = ProductFeature::find($key['product_feature_id']);
  
        if ($product_feature) {
          $product = Product::where('id', $product_feature->product_id)->get();
  
          if (!count($product)) {
            throw new Exception("Goods Not Found", 1);
          }
  
          GoodsMovement::create([
            'date' => $key['date'],
            'import_flag' => 0,
            'material_transfer_id' => null,
            'material_transfer_item_id' => null,
            'material_transfer_item_realisation_id' => null,
            'facility_id' => $facility, //Cutting Room
            'goods_id' => $product[0]->goods_id,
            'product_id' => $product[0]->id,
            'product_feature_id' => $key['product_feature_id'],
            'type_movement' => $output > 0 ? 1 : 2, // 1 for incoming and 2 outbound
            'qty' => $output,
            'order_item_id' => $key['order_item_id']
          ]);
          return ['status' => true];
        } else {
          return ['status' => false, 'msg' => 'product feature not found'];
        }
      } catch (\Throwable $th) {
        //throw $th;
        return ['status' => false, 'msg' => $th->getMessage()];
  
        return $th->getMessage();
      }
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
        $res = QC::with('order_item', 'sales_order')->find($id);
        return response()->json(['data' => $res]);
    } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ], 500);
      }
    }
}
