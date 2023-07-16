<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use Exception;
use DB;

use Illuminate\Http\Request;
use App\Models\Inventory\Inventory;
use App\Models\Inventory\InventoryItem;
use App\Models\Inventory\Scrap;
use App\Models\Shipment\ShipmentItem;
use App\Models\Order\OrderItem;
use App\Models\Inventory\MaterialTransferRealisation;

use App\Models\Product\ProductFeature;
use App\Models\Monitoring\Cutting;
use App\Models\Monitoring\Sewing;
use App\Models\Monitoring\QC;
use App\Models\Monitoring\FinishedGoods;

use App\Http\Controllers\Controller;
use App\Http\Resources\Inventory\Inventory as InventoryOneCollection;
use App\Http\Resources\Inventory\InventoryCollection;

class InventoryController extends Controller
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
    $query = Inventory::with('product_feature', 'facility')->groupBy('product_feature_id')->get();

    return new InventoryCollection($query);
    // return response()->json(['data' => $query]);
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
   * Scrap
   */
  public function scrap_insert(Request $request)
  {
    $param = $request->all()['payload'];

    try {
      Scrap::create([
        'product_id' => $param['product_id'],
        'product_feature_id' => $param['product_feature_id'],
        'order_id' => isset($param['order_id']) ?  $param['order_id'] : null,
        'order_item_id' => isset($param['order_item_id']) ? $param['order_item_id'] : null,
        'qty' => $param['qty'],
        'from_facility_id' => $param['from_facility_id'],
        'to_facility_id' => $param['to_facility_id']
      ]);
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true
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
    try {
      Inventory::create([
        'facility_id' => $param['facility_id'],
        'product_feature_id' => $param['product_feature_id'],
        'qty_on_hand' => $param['qty_on_hand']
      ]);
    } catch (Exception $th) {
      //throw $th;
      return response()->json(
        [
          'success' => false,
          'errors' => $th->getMessage()
        ],
        500
      );
    }
    return response()->json([
      'success' => true
    ], 200);
  }

  /** Display Resources 
   * 
   */

  public function InventoryStock(Request $request)
  {
    $paginate = $request->query('paginate');

    try {
      $query = ProductFeature::with('movement', 'product')
        ->get();
        // ->map(function ($item) {
        //   $product = $item->product ? $item->product : null;
        //   $goods = $product ? $product->goods : null;

        //   // Retrieve the incoming and outgoing quantities
        //   $incoming_qty_ = $item->in->isEmpty() ? 0 : $item->in[0]->qty;
        //   $outgoing_qty_ = $item->out->isEmpty() ? 0 : $item->out[0]->qty;

        //   //Goods produced if its finished goods
        //   $finishedGoods = $item->finished_goods->isEmpty() ? 0 : $item->finished_goods[0]->output;

        //   return [
        //     'id' => $item->id,
        //     'item_name' => $goods ? $goods->name . ' - ' . $item->color . ' ' . $item->size : null,
        //     'stock_in' => $incoming_qty_ + $finishedGoods,
        //     'stock_out' => $outgoing_qty_,
        //     'current_stock' => $incoming_qty_ - $outgoing_qty_ + $finishedGoods
        //   ];
        // });
    } catch (\Throwable $th) {
      //throw $th;

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
   * Display Laporan Barang Masuk coming from
   * Shipment resouces
   * 
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */

  public function regIncomingMaterial(Request $request)
  {
    // $monthYear = $request->query('monthYear');
    $from_date = $request->query('fromDate');
    $thru_date = $request->query('thruDate');


    try {
      if (!isset($from_date) && !isset($thru_date)) {
        // Throw an exception if the $from_date and $thru_date variables are not set
        throw new Exception("Error Processing Request", 1);
      }

      $query = ShipmentItem::with(['order_item' => function ($query) {
        return $query->with(['order' => function ($query) {
          // Load the related order and purchase order only if purchase_order_id is not null
          return $query->with('purchase_order')->whereNotNull('purchase_order_id');
        }]);
      }])
        ->whereHas('order_item', function ($query) {
          // Filter shipment items that have associated order items
          return $query->whereHas('order', function ($query) {
            // Filter order items that have associated orders with purchase_order_id not null
            return $query->whereNotNull('purchase_order_id');
          });
        })
        ->whereHas('shipment', function ($query) use ($from_date, $thru_date) {
          return $query
            ->where('shipment_type_id', 1)
            ->whereHas('status', function ($query) {
              // Filter shipments that have a status with shipment_type_status_id = 5 and group by shipment_id
              return $query->where('shipment_type_status_id', 5)->groupBy('shipment_id');
            })
            ->whereBetween(DB::raw('DATE(created_at)'), [$from_date, $thru_date]);
        })
        ->get();
    } catch (Exception $th) {
      //throw $th;
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

  public function regOutboundMaterial(Request $request)
  {
    // $monthYear = $request->query('monthYear');
    $from_date = $request->query('fromDate');
    $thru_date = $request->query('thruDate');

    try {
      if (!isset($from_date) && !isset($thru_date)) {
        throw new Exception("Error Processing Request", 1);
      }

      $query = ShipmentItem::with(['order_item' => function ($query) {
        return $query->with(['order' => function ($query) {
          return $query->with('sales_order')->whereNotNull('sales_order_id');
        }]);
      }])
        ->whereHas('order_item', function ($query) {
          return $query->whereHas('order', function ($query) {
            return $query->whereNotNull('sales_order_id');
          });
        })
        ->whereHas('shipment', function ($query) use ($from_date, $thru_date) {
          return $query
            ->where('shipment_type_id', 2)
            ->whereHas('status', function ($query) {
              return $query->where('shipment_type_status_id', 5)->groupBy('shipment_id');
            })
            ->whereBetween(DB::raw('DATE(created_at)'), [$from_date, $thru_date]);
        })
        ->get();
    } catch (\Throwable $th) {
      //throw $th;
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
   * This API will returned data from different 
   * process of production such as Cutting, Sewing, QC,
   * and Finished Goods
   * 
   * @param \Illuminate\Http\Request
   * @return \Illuminate\Http\Response
   */
  public function repWIP(Request $request)
  {

    // $monthYear = $request->query('monthYear');
    $from_date = $request->query('fromDate');
    $thru_date = $request->query('thruDate');
    $cat = 'sewing';

    try {

      // check if user carry monthYear variable
      if (!isset($from_date) && !isset($thru_date)) {
        throw new Exception("Error Processing Request", 1);
      }


      $_test = OrderItem::whereHas('wip_cutting', function ($query) use ($from_date, $thru_date, $cat) {
        $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
      })
        ->orWhereHas('wip_sewing', function ($query) use ($from_date, $thru_date, $cat) {
          $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
        })
        ->orWhereHas('wip_qc', function ($query) use ($from_date, $thru_date, $cat) {
          $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
        })
        ->orWhereHas('wip_fg', function ($query) use ($from_date, $thru_date, $cat) {
          $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
        })
        ->with([
          'product_feature',
          'wip_cutting' => function ($query) use ($from_date, $thru_date) {
            $query->with(['wip_sewing' => function ($query) use ($from_date, $thru_date) {
              $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
            }])
              ->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
          },
          'wip_sewing' => function ($query) use ($from_date, $thru_date) {
            $query->with(['wip_qc' => function ($query) use ($from_date, $thru_date) {
              $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
            }])
              ->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
          },
          'wip_qc' => function ($query) use ($from_date, $thru_date) {
            $query->with(['wip_fg' => function ($query) use ($from_date, $thru_date) {
              $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
            }])
              ->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
          },
          'wip_fg' => function ($query) use ($from_date, $thru_date) {
            $query->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
          },
        ])
        ->orderBy('product_feature_id')
        ->get();

      $convertedData = $_test->flatMap(function ($item) {
        $categories = new Collection();

        if ($item->wip_cutting->isNotEmpty()) {
          $wipCutting = $item->wip_cutting[0];
          if ($wipCutting->wip_sewing->isEmpty()) { // Check if wip_sewing is empty
            $categories[] = [
              'category' => 'WIP cutting',
              'date_wip' => $wipCutting->date,
              'total_output' => $wipCutting->total_output,
              'next_wip_output' => 0,
              'current_position' => 'Cutting Storage'
            ];
          } else {
            $wipSewing = $wipCutting->wip_sewing[0];
            $categories[] = [
              'category' => 'WIP Cutting',
              'date_wip' => $wipCutting->date,
              'total_output' => $wipCutting->total_output,
              'next_wip_output' => $wipSewing->total_output,
              'current_position' => 'Cutting Storage'
            ];
          }
        }

        if ($item->wip_sewing->isNotEmpty()) {
          $wipSewing = $item->wip_sewing[0];
          if ($wipSewing->wip_qc->isEmpty()) { // Check if wip_qc is empty
            $categories[] = [
              'category' => 'WIP Sewing',
              'date_wip' => $wipSewing->date,
              'total_output' => $wipSewing->total_output,
              'next_wip_output' => 0,
              'current_position' => 'Sewing Storage'
            ];
          } else {
            $wipQc = $wipSewing->wip_qc[0];
            $categories[] = [
              'category' => 'WIP Sewing',
              'date_wip' => $wipSewing->date,
              'total_output' => $wipSewing->total_output,
              'next_wip_output' => $wipQc->total_output,
              'current_position' => 'Sewing Storage'
            ];
          }
        }

        if ($item->wip_qc->isNotEmpty()) {
          $wipQC = $item->wip_qc[0];
          if ($wipQC->wip_fg->isEmpty()) { // Check if wip_fg is empty
            $categories[] = [
              'category' => 'WIP QC',
              'date_wip' => $wipQC->date,
              'total_output' => $wipQC->total_output,
              'next_wip_output' => 0,
              'current_position' => 'QC Goods Storage'
            ];
          } else {
            $wipFg = $wipQc->wip_fg[0];
            $categories[] = [
              'category' => 'WIP QC',
              'date_wip' => $wipQC->date,
              'total_output' => $wipQC->total_output,
              'next_wip_output' => $wipFg->total_output,
              'current_position' => 'QC Goods Storage'
            ];
          }
        }

        if ($item->wip_fg->isNotEmpty()) {
          $categories[] = [
            'category' => 'WIP Finished Goods',
            'date_wip' => $item->wip_fg[0]->date,
            'total_output' => $item->wip_fg[0]->total_output,
            'next_wip_output' => 0,
            'current_position' => 'Finished Goods Storage'
          ];
        }

        $productFeature = $item->product_feature;
        $product = $productFeature ? $productFeature->product : null;
        $goods = $product ? $product->goods : null;

        return $categories->map(function ($category) use ($item, $productFeature, $goods) {
          return [
            'id' => $item->id,
            'order_id' => $item->order_id,
            'qty' => $item->qty,
            'unit_price' => $item->unit_price,
            'cm_price' => $item->cm_price,
            'cm_cost' => $item->cm_cost,
            'shipment_estimated' => $item->shipment_estimated,
            'product_id' => $productFeature->product->id,
            'product_feature_id' => $item->product_feature_id,
            'description' => null,
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'unit_measurement' => $goods ? $goods->satuan : null,
            'category' => $category['category'],
            'date_wip' => $category['date_wip'],
            'total_output' => $category['total_output'],
            'next_wip_output' => $category['next_wip_output'],
            'sub_kontrak' => 'PT Buana Sandang Indonesia',
            'current_position' => $category['current_position']
          ];
        });
      });


      $summedData = collect($convertedData)->groupBy(function ($item) {
        return $item['product_feature_id'] . '-' . $item['category'];
      })->map(function ($items) {
        return [
          'id' => $items[0]['id'],
          'nomor_bukti' => 1111 + 1,
          'tanggal_bukti' => '2023-05-01',
          'order_id' => $items[0]['order_id'],
          'qty' => $items[0]['qty'],
          'unit_price' => $items[0]['unit_price'],
          'cm_price' => $items[0]['cm_price'],
          'cm_cost' => $items[0]['cm_cost'],
          'shipment_estimated' => $items[0]['shipment_estimated'],
          'product_id' => $items[0]['product_id'],
          'product_feature_id' => $items[0]['product_feature_id'],
          'description' => $items[0]['description'],
          'item_name' => $items[0]['item_name'],
          'unit_measurement' => $items[0]['unit_measurement'],
          'date_wip' => $items[0]['date_wip'],
          'category' => $items[0]['category'],
          'total_output' => $items->sum('total_output'),
          'next_wip_output' => $items->sum('next_wip_output'),
          'sub_kontrak' => $items[0]['sub_kontrak'],
          'current_position' => $items[0]['current_position']
        ];
      })->values();
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'length' => $summedData->count(),
      'data' => $summedData
    ]);
  }

  /**
   * This API will returned resources from
   * material-transfer which has been confirmed 
   * to tranfer
   * 
   * @param \Illuminate\Http\Request 
   * @param \App\Models\MaterialTransferItemRealisation
   * @return \Illuminate\Http\Response
   */
  public function repMaterialTransfer(Request $request)
  {
    // $monthYear = $request->query('monthYear');
    $from_date = $request->query('fromDate');
    $thru_date = $request->query('thruDate');
    $cat = $request->query('cat');

    $cat_lvl = [];

    switch ($cat) {
      case 'bahan_jadi':
        # code...
        $cat_lvl =[1];
        break;

      case 'bahan_baku':
        # code...
        $cat_lvl = [2,3,4,5,6,7,8];
        break;

      default:
        # code...
        $cat_lvl = [1,2,3,4,5,6,7];
        break;
    }


    try {

      if (!isset($from_date) && !isset($thru_date)) throw new Exception("Error Processing Request", 1);

      $query = ProductFeature::with(
        [
          'movement' => function($query) use ($from_date, $thru_date){
            return $query
                    ->select('id', 'product_id', 'product_feature_id', 'goods_id', 'material_transfer_id', 'type_movement', 'material_transfer_item_id', 'material_transfer_item_realisation_id', 'date', DB::raw('sum(qty) as final_qty'))
                    ->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date])
                    ->groupBy('product_feature_id', 'type_movement');
          },
          'last_movement' => function($query) use ($from_date){
            return $query
                    ->select('id', 'product_id', 'product_feature_id', 'goods_id', 'material_transfer_id', 'type_movement', 'material_transfer_item_id', 'material_transfer_item_realisation_id', 'date', DB::raw('sum(qty) as final_qty'))
                    ->where('date', '<', $from_date);
          },
          'product_category'
        ])
        ->whereHas('product_category', function($query) use ($cat_lvl){
          return $query
          ->whereIn('product_category_id', $cat_lvl);
        })
        ->whereHas('movement', function($query) use ($from_date, $thru_date){
          return $query
          ->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
        })
        ->get();

      $convert = $query->map(function($item){
        $product = $item->product ? $item->product : null;
        $goods = $product ? $product->goods : null;

        $qty_pemasukan = 0;
        $qty_pengeluaran = 0;

        if(count($item->movement) >= 1) {
          foreach ($item->movement as $key) {
            # code...
            // find incoming goods to a facility
            if($key->type_movement === 1) {
              $qty_pemasukan = $qty_pemasukan + $key->final_qty;
            } else if ($key->type_movement === 2) {
              $qty_pengeluaran = $qty_pengeluaran + $key->final_qty;
            } else {
              $qty_pemasukan = 0;
              $qty_pengeluaran = 0;
            }
          }
        }

        $initial_stock = count($item->last_movement) ? $item->last_movement[0]->final_qty : 0;

        return [
          'product_feature_id' => $item->id,
          'product_id' => $item->product_id,
          'item_name' => $goods ? $goods->name . ' - ' . $item->color . ' ' . $item->size : null,
          'category_name' => $item->product_category ? $item->product_category->category->name . ' - ' . $item->product_category->category->sub->name : null,
          'unit_measurement' => $goods ? $goods->satuan : null,
          // 'movement' => $item->product_category,
          'incoming_qty' => count($item->in) ? $item->in[0]->qty : 0,
          'outbound_qty' => count($item->out) ? $item->out[0]->qty : 0,
          'initial_stock' => $initial_stock,
          'qty_pemasukan' => $qty_pemasukan,
          'qty_pengeluaran' => $qty_pengeluaran,
          'final_stock' => $initial_stock + $qty_pemasukan + $qty_pengeluaran
        ];
      });

    } catch (\Throwable $th) {
      //throw $th;

      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $convert
    ]);
  }

  public function get_scrap(Request $request)
  {
    // $param = $request->all()['payload'];
    $from_date = $request->query('fromDate');
    $thru_date = $request->query('thruDate');

    try {
      $query = Scrap::with('product', 'product_feature')
        ->whereBetween(DB::raw('DATE(created_at)'), [$from_date, $thru_date])
        ->get();

      $prepared_data = $query->map(function ($item) {
        $productFeature = $item->product_feature;
        $product = $item->product ? $item->product : null;
        $goods = $product ? $product->goods : null;

        $unit_price = 29000;
        $valuation = $item['qty'] * $unit_price;

        return [
          'id' => $item['id'],
          'nomor_pendaftaran' => '1234',
          'tanggal_dokumen' => '2022/07/05',
          // 'material_transfer_id' => $item['material_transfer_id'],
          // 'material_transfer_item_id' => $item['material_transfer_item_id'],
          'transferred_qty' => $item['qty'],
          'transfer_date' => $item['created_at'],
          'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
          'unit_measurement' => $goods ? $goods->satuan : '',
          'category_name' => 'Scrap',
          'goods_id' => $product['goods_id'],
          'unit_price' => $unit_price,
          'valuation' => $valuation,
          'product_id' => $item['product_id'],
          'product_feature_id' => $item['product_feature_id']
        ];
      });
    } catch (\Throwable $th) {
      //throw $th;

      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $prepared_data
    ]);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\X  $X
   * @return \Illuminate\Http\Response
   */
  public function show(X $x)
  {
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
