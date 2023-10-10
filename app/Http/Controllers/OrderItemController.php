<?php

namespace App\Http\Controllers;


use App\Models\Order\OrderItem;
use App\Http\Controllers\Controller;
use App\Http\Resources\Order\OrderItemCollection;
use App\Http\Resources\Order\OrderItem as oneOrderItem;
use App\Models\Product\Product;
use App\Models\Product\ProductFeature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderItemController extends Controller
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
    $query = OrderItem::all();

    return new OrderItemCollection($query);
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

      $salesItemsCreation = [];

      foreach ($param as $key) {
        if (array_key_exists('product_id', $key) && array_key_exists('costing_item_id', $key)) {
          $product__id = $key['product_id'];
          $costing_item_id_ = $key['costing_item_id'];
          array_push($salesItemsCreation, [
            'order_id' => $key['order_id'],
            'product_feature_id' => $key['product_feature_id'],
            'product_id' => $product__id,
            'costing_item_id' => $costing_item_id_,
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'cm_price' => $key['cm_price'],
            'shipment_estimated' => date('Y-m-d', strtotime('2022-04-03'))
          ]);
  
        } else {
          $queryProduct = ProductFeature::find($key['product_feature_id']);
          $product__id = $queryProduct->product_id;
          array_push($salesItemsCreation, [
            'order_id' => $key['order_id'],
            'product_feature_id' => $key['product_feature_id'],
            'product_id' => $product__id,
            'qty' => $key['qty'],
            'unit_price' => $key['unit_price'],
            'cm_price' => $key['cm_price'],
            'shipment_estimated' => date('Y-m-d', strtotime('2022-04-03'))
          ]);
  
        }
  
      }

      OrderItem::insert($salesItemsCreation);
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
      ],
      200
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
      $orderItem = OrderItem::with('product_feature', 'check_shipment')->where('order_id', $id)->get();
      return new OrderItemCollection($orderItem);
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getError()
      ], 500);
    }
  }

  public function getFinishedGoodsOrderItemWithStock($id)
  {
    try {
      $orderItem = OrderItem::with('product_feature', 'check_shipment')
        ->with(['product_feature' => function ($query) {
          return $query->with('product')
            ->with(['movement' => function ($query) {
              return $query->select('id', 'product_feature_id', DB::raw('sum(qty) as current_stock'))->where('facility_id', 2)->groupBy('product_feature_id');
            }]);
        }])
        ->where('order_id', $id)
        ->get()
        ->map(function ($item) {

          $productFeature = $item->product_feature;
          $product = $productFeature ? $productFeature->product : null;
          $goods = $product ? $product->goods : null;

          $category = $productFeature ? $productFeature->product_category->category : null;
          $sub = $category ? $category->sub : null;

          $stock = count($productFeature->movement) ? $productFeature->movement[0] : 0;

          return [
            'id' => $item->id,
            'order_item_id' => $item->id,
            'order_id' => $item->order_id,
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'name' => $goods ? $goods->name : null,
            'size' => $productFeature ? $productFeature->size : null,
            'color' => $productFeature ? $productFeature->color : null,
            'product_id' => $product->id,
            'product_feature_id' => $item->product_feature_id,
            'category' => $category->name,
            'goods_id' => $goods->id,
            'order_id' => $item->order_id,
            'current_stock' => $stock ? $stock->current_stock : 0,
            'qty_order' => $item->qty
          ];
        });

      // $filtered = $orderItem->where('current_stock', '>', 0);
      // return new OrderItemCollection($orderItem);
      $filtered = $orderItem;
    } catch (Exception $th) {
      return response()->json([
        'success' => false,
        'errors' => $th->getError()
      ], 500);
    }

    return response()->json([
      'data' => $filtered->values()->all()
    ]);
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
    $orderItemData = $request->all()['payload'];
    try {
      $orderItem = OrderItem::find($id)->update($orderItemData);

      return response()->json([
        'success' => true
      ], 200);
    } catch (Exception $e) {
      //throw $th;
      return response()->json([
        'success' => false,
        'errors' => $e->getMessage()
      ], 500);
    }
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
      OrderItem::destroy($id);
      return response()->json(['test' => 'yo']);
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
  }
}
