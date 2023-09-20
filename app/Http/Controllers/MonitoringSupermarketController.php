<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Monitoring\Supermarket;
use Exception;
use DB;

class MonitoringSupermarketController extends Controller
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
      if($param){
        $query = Supermarket::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, sum(qty) as output')
                ->groupBy('po_number', 'sales_order_id', 'order_item_id')
                ->with('sales_order', 'product_feature')
                ->with(['sewing' => function ($query) use ($order_id){
                  return $query->where('order_id', $order_id);
                }])
                ->where('order_id', $request->query('sales-order'))
                ->orderBy('date', 'desc')
                ->get();
      } else {
        $query = Supermarket::selectRaw('id, date, po_number, sales_order_id, product_feature_id, order_id, order_item_id, line, qty')
                ->with('sales_order', 'product_feature')
                ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
                ->orderBy('id', 'desc')
                ->get();
      }
      
    } catch (Throwable $th) {
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
      if (is_array($param) && count($param)) {
        $_rray = $param;
        foreach ($_rray as &$item) {
          unset($item['qty_loading']);
        }
        Supermarket::insert($_rray);
      } else {
        throw new Exception('Error');
      }

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

    return response()->json(['success' => true], 200);
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
      $res = Supermarket::with('order_item', 'sales_order')->find($id);
      return response()->json(['data' => $res]);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getMessage()
      ], 500);
    }
  }
}
