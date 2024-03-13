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

use App\Models\Inventory\GoodsMovement;
use App\Models\Inventory\MaterialTransfer;
use App\Models\Inventory\MaterialTransferShipmentRelationship;
use App\Models\Invoice\Invoice;
use App\Models\KITE\ExportDoc;
use App\Models\KITE\ImportDoc;
use App\Models\Manufacture\BOM;
use App\Models\Manufacture\BOMItem;
use App\Models\Order\Order;
use App\Models\Order\POBuyerProof;
use App\Models\Order\PurchaseOrder;
use App\Models\Order\SalesOrder;
use App\Models\Reconcile\Reconcile;
use App\Models\Reconcile\ReconcileHasSalesOrder;
use App\Models\Shipment\Shipment;
use Throwable;

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
    $costingId = $request->query('costing');
    $facilityId = $request->query('facility');

    try {

      if ($costingId) {
        $costing = Reconcile::select('order_id', 'costing_id')
          ->where('costing_id', $costingId)
          ->first();

        $list_of_so_item = OrderItem::select('id', 'product_feature_id')
          ->where('order_id', $costing->order_id)
          ->pluck('id')
          ->toArray();

        $costing_item_id = BOMItem::select('id', 'product_feature_id', 'product_id')
          ->where('bom_id', $costingId)
          ->pluck('id')
          ->toArray();

        $list_order_item = OrderItem::select('id', 'product_feature_id', 'costing_item_id')
          ->whereIn('costing_item_id', $costing_item_id)
          ->pluck('id')
          ->toArray();

        $list_of_item = array_merge($list_order_item, $list_of_so_item);

        // $query = ProductFeature::with('product', 'product_category')
        //   ->with(['movement' => function ($query) use ($_items, $facilityId) {
        //     return $query->select('id', 'product_feature_id', DB::raw('sum(qty) as current_stock'))
        //       ->where('facility_id', $facilityId)
        //       ->whereIn('product_feature_id', $_items)
        //       ->groupBy('product_feature_id');
        //   }])
        //   ->whereHas('movement')
        //   ->get()
        //   ->map(function ($query) {
        //     $product = $query->product ? $query->product : null;
        //     $goods = $product ? $product->goods : null;

        //     return
        //       [
        //         'id' => $query['id'],
        //         'sku_id' => str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($query['id'], 4, '0', STR_PAD_LEFT),
        //         'product_id' => $query['product_id'],
        //         'product_feature_id' => $query['id'],
        //         'item_name' => $goods ? $goods->name . ' - ' . $query->color . ' ' . $query->size : null,
        //         'unit_measurement' => $goods ? $goods->satuan : null,
        //         'brand' => $goods ? $goods->brand : null,
        //         'category_id' => $query->product_category->product_category_id,
        //         'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
        //         'current_stock' => count($query->movement) ? $query->movement[0]->current_stock : 0
        //       ];
        //   })
        //   ->filter(function ($item) {
        //     return $item['current_stock'] > 0;
        //   })
        //   ->values();

        $query = GoodsMovement::select('id', DB::raw('sum(qty) as current_stock'), 'product_id', 'goods_id', 'product_feature_id', 'order_item_id', 'import_flag', 'facility_id')
          ->with('product', 'product_feature', 'goods', 'product_category', 'facility')
          ->where('facility_id', $facilityId)
          ->whereIn('order_item_id', $list_of_item)
          ->groupBy('product_feature_id', 'import_flag', 'facility_id')
          ->get()
          ->map(function ($query) {
            $product_feature = $query->product_feature ? $query->product_feature : null;
            $product = $query['product'] ? $query['product'] : null;
            $goods = $query->goods ? $query->goods : null;

            // $import_flag = $query->import_flag ? 2 : 1;
            $doc_import = $query->import_flag;
            $import_flag = 1;

            if ($doc_import === 1) {
              $import_flag = 2;
            } elseif ($doc_import === 2) {
              $import_flag = 3;
            } else {
              $import_flag = 1;
            }


            $order_item_c = OrderItem::select('order_id', 'product_feature_id', DB::raw('avg(unit_price) as unit_price'))->where('product_feature_id', $product_feature->id)->groupBy('product_feature_id')->get();
            $order_item = count($order_item_c) ? $order_item_c[0] : null;
            if ($order_item) {
              $order_c = Order::select('currency_id')->where('id', $order_item->order_id)->get();
              if (count($order_c)) {
                $currency = $order_c[0]->currency_id;

                if ($currency === 1) {
                  $unit_price = $order_item->unit_price * 15000;
                } else {
                  $unit_price = $order_item->unit_price;
                }
              } else {
                $currency = 2;
                $unit_price = $order_item->unit_price;
              }
            } else {
              $currency = 2;
              $unit_price = 0;
            }

            return
              [
                'id' => $query->id,
                // 'sku_id_alt' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT) . '-' . $query->facility_id,
                'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                'import_flag' => $query->import_flag === 1 ? 'Lokal' : 'Impor',
                // 'product_id' => $product->id,
                // 'product_feature_id' => $product_feature->id,
                'item_name' => $goods ? $goods->name . ' - ' . $product_feature->color . ' ' . $product_feature->size : null,
                'unit_measurement' => $goods ? $goods->satuan : null,
                // 'brand' => $goods ? $goods->brand : null,
                'facility_id' => $query->facility_id,
                'facility_name' => $query->facility->name,
                'category_id' => $query->product_category->product_category_id,
                'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                'current_stock' => $query->current_stock,
                'origin_currency' => $currency === 2 ? 'Rupiah' : 'USD',
                'unit_price' => $unit_price,
                'total_price' => $unit_price * $query->current_stock
              ];
          })
          ->filter(function ($item) {
            return $item['current_stock'] >= 0;
          })
          ->values();
      } else {

        $query = GoodsMovement::select('id', DB::raw('sum(qty) as current_stock'), 'product_id', 'goods_id', 'product_feature_id', 'order_item_id', 'import_flag', 'facility_id')
          ->with('product', 'product_feature', 'goods', 'product_category', 'facility')
          ->where('facility_id', $facilityId)
          ->groupBy('product_feature_id', 'import_flag', 'facility_id')
          ->get()
          ->map(function ($query) {
            $product_feature = $query->product_feature ? $query->product_feature : null;
            $product = $query['product'] ? $query['product'] : null;
            $goods = $query->goods ? $query->goods : null;

            // $import_flag = $query->import_flag ? 2 : 1;
            $doc_import = $query->import_flag;
            $import_flag = 1;

            if ($doc_import === 1) {
              $import_flag = 2;
            } elseif ($doc_import === 2) {
              $import_flag = 3;
            } else {
              $import_flag = 1;
            }


            $order_item_c = OrderItem::select('order_id', 'product_feature_id', DB::raw('avg(unit_price) as unit_price'))->where('product_feature_id', $product_feature->id)->groupBy('product_feature_id')->get();
            $order_item = count($order_item_c) ? $order_item_c[0] : null;
            if ($order_item) {
              $order_c = Order::select('currency_id')->where('id', $order_item->order_id)->get();
              if (count($order_c)) {
                $currency = $order_c[0]->currency_id;

                if ($currency === 1) {
                  $unit_price = $order_item->unit_price * 15000;
                } else {
                  $unit_price = $order_item->unit_price;
                }
              } else {
                $currency = 2;
                $unit_price = $order_item->unit_price;
              }
            } else {
              $currency = 2;
              $unit_price = 0;
            }

            return
              [
                'id' => $query->id,
                // 'sku_id_alt' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT) . '-' . $query->facility_id,
                'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product_feature->id, 4, '0', STR_PAD_LEFT),
                'import_flag' => $query->import_flag === 1 ? 'Lokal' : 'Impor',
                // 'product_id' => $product->id,
                // 'product_feature_id' => $product_feature->id,
                'item_name' => $goods ? $goods->name . ' - ' . $product_feature->color . ' ' . $product_feature->size : null,
                'unit_measurement' => $goods ? $goods->satuan : null,
                // 'brand' => $goods ? $goods->brand : null,
                'facility_id' => $query->facility_id,
                'facility_name' => $query->facility->name,
                'category_id' => $query->product_category->product_category_id,
                'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                'current_stock' => $query->current_stock,
                'origin_currency' => $currency === 2 ? 'Rupiah' : 'USD',
                'unit_price' => $unit_price,
                'total_price' => $unit_price * $query->current_stock
              ];
          })
          ->filter(function ($item) {
            return $item['current_stock'] >= 0;
          })
          ->values();
      }
    } catch (\Throwable $th) {
      //throw $th;

      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $query,
      // 'list_order_item' => $list_order_item,
      // '_items' => $costing_item_id
    ]);
  }

  public function change_date_format($str)
  {
    $timestamp = strtotime($str);
    $formatted_date = strftime('%e %B %Y', $timestamp);
    return $formatted_date;
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
          return $query->with(['purchase_order' => function ($query) {
            return $query->with('import_doc');
          }]);
        }]);
      }, 'import_info'])
        ->whereHas('import_info')
        ->whereHas('shipment', function ($query) use ($from_date, $thru_date) {
          return $query
            ->where('shipment_type_id', 1)
            ->whereHas('status', function ($query) {
              // Filter shipments that have a status with shipment_type_status_id = 5 and group by shipment_id
              return $query->where('shipment_type_status_id', 5)->groupBy('shipment_id');
            })
            ->whereBetween(DB::raw('DATE(created_at)'), [$from_date, $thru_date]);
        })
        ->get()
        ->map(function ($item, $index) {
          $orderItem = $item->order_item ? $item->order_item : null;
          $order = $orderItem ? $orderItem->order : null;
          $purchaseOrder = $order ? $order->purchase_order : null;
          $ship_to = $purchaseOrder ? $purchaseOrder->party : null;
          $productFeature = $orderItem->product_feature ? $orderItem->product_feature : null;
          $product = $productFeature->product ? $productFeature->product : null;
          $goods = $product->goods ? $product->goods : null;
          $importItem  = $item->import_info ? $item->import_info : null;
          $importDoc  = $importItem ? $importItem->doc : null;

          $doc_type = '';

          $costing_item_id = $orderItem['costing_item_id'];
          $costing_item = null;

          if ($costing_item_id) {
            $costing_item = BOMItem::find($costing_item_id);
          }

          $inv = null;
          $vb_attachment = null;

          if ($order) {
            $inv = Invoice::with('vendor_bills_attachment')->where('order_id', $order->id)->first();
            if (isset($inv['vendor_bills_attachment'])) {
              $vb_attachment = $inv['vendor_bills_attachment'];
            }
          }

          switch ($importDoc->type) {
            case 1:
              $doc_type = 'BC 2.0';
              break;

            case 2:
              $doc_type = 'BC 2.4';
              break;

            case 3:
              $doc_type = 'BC 2.5';
              break;

            case 4:
              $doc_type = 'BC 2.8';
              break;

            default:
              # code...
              $doc_type = 'None';
              break;
          }

          return [
            'id' => $index + 1,
            'sku_id' => '02-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
            'shipment_id' => $item->shipment->id,
            'serial_number' => 'INSHIP-' . str_pad($purchaseOrder->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($item->shipment->id, 4, '0', STR_PAD_LEFT),
            'recoded_date' => $item->shipment->delivery_date,
            'shipment_date' => $item->shipment->delivery_date,
            'product_id' => $product->id,
            'product_feature_id' => $productFeature->id,
            'goods_id' => $goods->id,
            'purchase_order_id' => $purchaseOrder->id,
            'order_id' => $order->id,
            'order_item_id' => $orderItem->id,
            'buyer_name' => $ship_to->name,
            'country' => $ship_to->address->country,
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'unit_measurement' => $goods ? $goods->satuan : null,
            'qty' => $orderItem->qty,
            'unit_price' => $orderItem->unit_price,
            'valuation' => $orderItem->qty * $orderItem->unit_price,
            'customs_item_number' => str_pad($importItem->item_serial_number, 6, '0', STR_PAD_LEFT),
            'customs_doc' => $doc_type,
            'hs_code_item' => $importItem->hs_code,
            'bl_number' => $importDoc->bl_number,
            'pl_number' => $importDoc->pl_number,
            'customs_document_id' => $importDoc->id,
            'customs_document_number' => $importDoc->document_number,
            'customs_document_date' => $importDoc->date,
            'currency' => $order->currency_id,
            'costing_item_id' => $costing_item ? $costing_item->id : null,
            'costing_id' => $costing_item ? $costing_item->bom_id : null,
            'invoice_id' => $inv ? $inv['id'] : null,
            'vendor_bills' => $inv ? $inv['reff_number'] : null,
            'vb_attachment' => $vb_attachment ? (isset($vb_attachment['url']) ? $vb_attachment['url'] : null) : null
          ];
        });
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
          return $query->with(['sales_order' => function ($query) {
            return $query->with('export_doc');
          }])->whereNotNull('sales_order_id');
        }]);
      }])
        ->whereHas('order_item', function ($query) {
          return $query->whereHas('order', function ($query) {
            return $query->whereNotNull('sales_order_id')->whereHas('sales_order', function ($query) {
              return $query->whereHas('export_doc');
            });
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
        ->whereHas('export_info')
        ->get()
        ->map(function ($item, $index) {
          $orderItem = $item->order_item ? $item->order_item : null;
          $order = $orderItem ? $orderItem->order : null;
          $salesOrder = $order ? $order->sales_order : null;
          $ship_to = $salesOrder ? $salesOrder->ship : null;
          $productFeature = $orderItem->product_feature ? $orderItem->product_feature : null;
          $product = $productFeature->product ? $productFeature->product : null;
          $goods = $product->goods ? $product->goods : null;
          $exportDoc  = $salesOrder->export_doc ? $salesOrder->export_doc : null;

          $costing_item_id = $orderItem['costing_item_id'];
          $costing_item = null;
          $costing_id = null;
          $po_proof = null;

          if ($costing_item_id) {
            $costing_item = BOMItem::find($costing_item_id);
          }

          if ($salesOrder) {
            $temp_rhso = Reconcile::where('sales_order_id', $salesOrder->id)->get();

            $po_proof = POBuyerProof::where('sales_order_id', $salesOrder->id)->orderBy('id', 'desc')->first();
            if (count($temp_rhso)) {
              $costing_id = $temp_rhso[0]->costing_id;
            }
          }

          return [
            'id' => $index + 1,
            'sku_id' => '01-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
            'shipment_id' => $item->shipment->id,
            'serial_number' => $item->shipment->serial_number,
            'shipment_date' => $this->change_date_format($item->shipment->delivery_date),
            'product_id' => $product->id,
            'product_feature_id' => $productFeature->id,
            'goods_id' => $goods->id,
            'sales_order_id' => $salesOrder->id,
            'order_id' => $order->id,
            'order_item_id' => $orderItem->id,
            'buyer_name' => $ship_to->name,
            'country' => $ship_to->address->country,
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'unit_measurement' => $goods ? $goods->satuan : null,
            'qty' => $item->qty_shipped,
            'unit_price' => $orderItem->unit_price,
            'valuation' => $orderItem->qty * $orderItem->unit_price,
            'export_document_id' => $exportDoc ? $exportDoc->id : null,
            'export_document_number' => $exportDoc ? $exportDoc->document_number : null,
            'bl_number' => $exportDoc ? $exportDoc->bl_number : null,
            'export_document_date' => $exportDoc ? $this->change_date_format($exportDoc->date) : null,
            'currency' => $order->currency_id,
            'costing_item_id' => $costing_item ? $costing_item->id : null,
            'costing_id' => $costing_id,
            'po_proof' => $po_proof ? $po_proof->imageUrl : null
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

  public function repWIPSubcontract(Request $request)
  {
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');
    $type = $request->query('type_of_shipment');

    try {
      if (!isset($fromDate) && !isset($thruDate)) {
        throw new Exception("Error Processing Request", 1);
      }
      // $query = GoodsMovement::with('product', 'product_feature', 'goods', 'material_transfer')
      //   ->where('facility_id', $type)
      //   ->whereHas('material_transfer', function ($query) {
      //     return $query->whereHas('relation_to_shipment', function ($query) {
      //       return $query->whereHas('shipment', function ($query) {
      //         return $query->where('subcontract_flag', 1);
      //       });
      //     });
      //   })
      //   // ->whereHas('relations_with_shipment', function($query) {
      //   //   return $query->whereHas('shipment', function($query) {
      //   //     return $query->where('shipment_type_id', 1);
      //   //   });
      //   // })
      //   // ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
      //   ->get()
      //   ->map(function ($item, $index) {
      //     $materialTransfer = $item->material_transfer ? $item->material_transfer : null;
      //     $productFeature = $item->product_feature;
      //     $product = $productFeature ? $productFeature->product : null;
      //     $goods = $product ? $product->goods : null;

      //     $mtsr = MaterialTransferShipmentRelationship::with('shipment')
      //       ->where('material_transfer_id', $materialTransfer->id)->get();
      //     return [
      //       'id' => $index + 1,
      //       'document_number' => $materialTransfer->id,
      //       'document_date' => $materialTransfer->est_transfer_date,
      //       'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
      //       'goods_id' => $goods->id,
      //       'product_id' => $productFeature->product->id,
      //       'product_feature_id' => $item->product_feature_id,
      //       'unit_measurement' => $goods ? $goods->satuan : null,
      //       'subcontractor_name' => count($mtsr) ? $mtsr[0]->shipment->order->sales_order->ship->name : null,
      //       'qty' => $item->qty
      //     ];
      //   });

      $query = ShipmentItem::with(['shipment' => function ($query) {
        return $query->with('party');
      }])->with('order_item')->whereHas('shipment', function ($query) use ($fromDate, $thruDate, $type) {
        return $query->where('shipment_type_id', $type)
          ->whereBetween(DB::raw('DATE(delivery_date)'), [$fromDate, $thruDate]);
      })
        // ->groupBy('order_item_id')
        ->get()
        ->map(function ($item, $index) {
          $productFeature = $item->order_item ? $item->order_item->product_feature : null;
          $product = $productFeature ? $productFeature->product : null;
          $goods = $product ? $product->goods : null;

          $ship_to = $item->shipment->ship_to ? $item->shipment->party['name'] : null;

          $name = null;

          if ($item->shipment->shipment_type_id === 3) {
            $name = 'SUBCONT-IN-';
          } else {
            $name = 'SUBCONT-OUT-';
          }

          return [
            'id' => $index + 1,
            'shipment_id' => $item->shipment->id,
            'document_number' => $name . $item->shipment->id,
            'document_date' => $item->shipment->delivery_date,
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'goods_id' => $goods->id,
            'product_id' => $product->id,
            'product_feature_id' => $productFeature->id,
            'unit_measurement' => $goods ? $goods->satuan : null,
            'subcontractor_name' => $ship_to,
            'qty' => $item->qty_shipped
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
      'data' => $query
    ]);
  }

  public function repRawMaterialMovement(Request $request)
  {
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');
    $type = $request->query('type_of_facility');

    try {
      if (!isset($fromDate) && !isset($thruDate)) {
        throw new Exception("Error Processing Request", 1);
      }
      $query = GoodsMovement::select(
        'id',
        'import_flag',
        'product_id',
        'product_feature_id',
        'goods_id',
        'order_item_id',
        'material_transfer_id',
        'facility_id',
        'type_movement',
        DB::raw('sum(qty)*-1 as qty')
      )
        ->with('product', 'product_feature', 'goods', 'material_transfer')
        ->where('facility_id', 3)
        ->where('import_flag', 1)
        // ->whereIn('facility_id', [3, 18])
        ->where('qty', '<', 0)
        ->whereNotNull('order_item_id')
        ->groupBy('facility_id', 'product_feature_id')
        // ->whereHas('relations_with_shipment', function($query) {
        //   return $query->whereHas('shipment', function($query) {
        //     return $query->where('shipment_type_id', 1);
        //   });
        // })
        ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
        ->get()
        ->map(function ($item, $index) {
          $materialTransfer = $item->material_transfer ? $item->material_transfer : null;
          $productFeature = $item->product_feature;
          $product = $productFeature ? $productFeature->product : null;
          $goods = $product ? $product->goods : null;

          $purchase_order_id = null;
          $costing_id = null;
          $shipment_id = null;
          $import_doc = null;
          $inv = null;
          $vb_attachment = null;

          if (isset($item->order_item_id)) {
            $order_item = OrderItem::find($item->order_item_id);
            if ($order_item) {
              $temp = PurchaseOrder::where('order_id', $order_item->order_id)->get();
              if (count($temp)) {
                $purchase_order_id = $temp[0]->id;
                $inv = Invoice::with('vendor_bills_attachment')->where('order_id', $temp[0]->order_id)->first();
                if (isset($inv['vendor_bills_attachment'])) {
                  $vb_attachment = $inv['vendor_bills_attachment'];
                }
              }

              $costing = BOMItem::find($order_item->costing_item_id);
              if ($costing) {
                $costing_id = $costing->bom_id;
              }

              $shipment = Shipment::where('order_id', $order_item->order_id)->get();
              if (count($shipment)) {
                $shipment_id = $shipment[0]->id;
              }

              $temp_import_doc = ImportDoc::where('order_id', $order_item->order_id)->get();
              if (count($temp_import_doc)) {
                $import_doc = $temp_import_doc[0];
              }
            }
          }

          $doc_import = $item->import_flag;
          $import_flag = 1;

          if ($doc_import === 1) {
            $import_flag = 2;
          } elseif ($doc_import === 2) {
            $import_flag = 3;
          } else {
            $import_flag = 1;
          }

          return [
            'id' => $index + 1,
            'facility_id' => $item->facility_id,
            'material_transfer_id' => $materialTransfer->id,
            'document_number' => $materialTransfer->id,
            'costing_id' => $costing_id,
            'purchase_order_id' => $purchase_order_id,
            'document_date' => $materialTransfer->est_transfer_date,
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'order_item_id' => $item->order_item_id,
            'shipment_id' => $shipment_id,
            'goods_id' => $goods->id,
            'product_id' => $productFeature->product->id,
            'product_feature_id' => $item->product_feature_id,
            'unit_measurement' => $goods ? $goods->satuan : null,
            'qty' => $item->qty,
            'import_flag' => $import_flag,
            'import_id' => $import_doc ? $import_doc->id : null,
            'customs_document_number' => $import_doc ? $import_doc->document_number : null,
            'pl_number' => $import_doc ? $import_doc->pl_number : 'Tidak Ada',
            'bl_number' => $import_doc ? $import_doc->bl_number : 'Tidak Ada',
            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
            'invoice_id' => $inv ? $inv['id'] : null,
            'vendor_bills' => $inv ? $inv['reff_number'] : null,
            'vb_attachment' => $vb_attachment ? (isset($vb_attachment['url']) ? $vb_attachment['url'] : null) : null
          ];
        });

      $organizedData = array();
      foreach ($query as $item) {
        $itemName = $item['product_feature_id'];
        $facility = $item['facility_id'];
        if (!isset($organizedData[$itemName])) {
          $organizedData[$itemName] = array(
            'id' => $item['id'],
            'material_transfer_id' => $item['document_number'],
            'document_number' => str_pad($item['document_number'], 4, '0', STR_PAD_LEFT),
            'document_date' => $this->change_date_format($item['document_date']),
            'sku_id' => $item['sku_id'],
            'facility_id' => $item['facility_id'],
            'order_item_id' => $item['order_item_id'],
            'costing_id' => $item['costing_id'],
            'purchase_order_id' => $item['purchase_order_id'],
            'shipment_id' => $item['shipment_id'],
            'import_id' => $item['import_id'],
            'customs_document_number' => $item['customs_document_number'],
            'pl_number' => $item['pl_number'],
            'bl_number' => $item['bl_number'],
            "item_name" => $item['item_name'],
            "product_id" => $item['product_id'],
            "product_feature_id" => $item['product_feature_id'],
            "goods_id" => $item['goods_id'],
            "unit_measurement" => $item['unit_measurement'],
            "qty_digunakan" => 0,
            "qty_subcontract" => 0,
            "subcontractor_name" => '',
            "invoice_id" => $item['invoice_id'],
            "vendor_bills" => $item['vendor_bills'],
            "vb_attachment" => $item['vb_attachment']
          );
        }

        // Step 3: Sum up the quantities for "type_movement" 1 and 2 for each "item_name"
        if ($facility == 3) {
          $organizedData[$itemName]['qty_digunakan'] += $item['qty'];
        } elseif ($facility == 18) {
          $organizedData[$itemName]['qty_subcontract'] += $item['qty'] * -1;
          // $data = MaterialTransferShipmentRelationship::where('material_transfer_id', $item['material_transfer_id'])
          //         ->with('shipment')
          //         ->get();
          // $organizedData[$itemName]['subcontractor_name'] = $data;
        }
      }

      $result = array_values($organizedData);
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $result
    ]);
  }

  public function repFGoods(Request $request)
  {
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');
    $type = $request->query('type_of_facility');

    try {
      if (!isset($fromDate) && !isset($thruDate)) {
        throw new Exception("Error Processing Request", 1);
      }

      $order_id = SalesOrder::select('order_id')->where('export_flag', 1)->get()->map(function ($item) {
        return $item->order_id;
      });

      $order_item = OrderItem::select('product_feature_id')->whereIn('order_id', $order_id)->groupBy('product_feature_id')->get()->map(function ($item) {
        return $item->product_feature_id;
      });

      $query = GoodsMovement::select(
        'id',
        'product_id',
        'product_feature_id',
        'goods_id',
        'material_transfer_id',
        'facility_id',
        'type_movement',
        DB::raw('sum(qty) as qty')
      )
        ->with('product', 'product_feature', 'goods', 'material_transfer')
        ->where('facility_id', 2)
        // ->whereIn('facility_id', [2])
        ->where('qty', '>', 0)
        ->whereIn('product_feature_id', $order_item)
        ->groupBy('facility_id', 'product_feature_id')
        // ->whereHas('relations_with_shipment', function($query) {
        //   return $query->whereHas('shipment', function($query) {
        //     return $query->where('shipment_type_id', 1);
        //   });
        // })
        ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
        ->get()
        ->map(function ($item, $index) {
          $materialTransfer = $item->material_transfer ? $item->material_transfer : null;
          $productFeature = $item->product_feature;
          $product = $productFeature ? $productFeature->product : null;
          $goods = $product ? $product->goods : null;

          return [
            'id' => $index + 1,
            'facility_id' => $item->facility_id,
            'document_number' => $materialTransfer->id,
            'document_date' => $materialTransfer->est_transfer_date,
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'goods_id' => $goods->id,
            'product_id' => $productFeature->product->id,
            'product_feature_id' => $item->product_feature_id,
            'unit_measurement' => $goods ? $goods->satuan : null,
            'qty' => $item->qty
          ];
        });

      $organizedData = array();
      foreach ($query as $item) {
        $itemName = $item['product_feature_id'];
        $facility = $item['facility_id'];
        if (!isset($organizedData[$itemName])) {
          $organizedData[$itemName] = array(
            'id' => $item['id'],
            'material_transfer_id' => $item['document_number'],
            'document_number' => 'MT-' . str_pad($item['document_number'], 4, '0', STR_PAD_LEFT),
            'document_date' => $this->change_date_format($item['document_date']),
            'facility_id' => $item['facility_id'],
            "item_name" => $item['item_name'],
            "product_id" => $item['product_id'],
            "product_feature_id" => $item['product_feature_id'],
            "goods_id" => $item['goods_id'],
            "unit_measurement" => $item['unit_measurement'],
            "qty_digunakan" => 0,
            "qty_subcontract" => 0,
            "subcontractor_name" => ''
          );
        }

        // Step 3: Sum up the quantities for "type_movement" 1 and 2 for each "item_name"
        if ($facility == 2) {
          $organizedData[$itemName]['qty_digunakan'] += $item['qty'];
        } elseif ($facility == 17) {
          $organizedData[$itemName]['qty_subcontract'] = 0;
        }
      }

      $result = array_values($organizedData);
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $result
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
        $cat_lvl = [1];
        break;

      case 'bahan_baku':
        # code...
        $cat_lvl = [2, 3, 4, 5, 6, 7, 8];
        break;

      default:
        # code...
        $cat_lvl = [1, 2, 3, 4, 5, 6, 7];
        break;
    }


    try {

      if (!isset($from_date) && !isset($thru_date)) throw new Exception("Error Processing Request", 1);

      $query = ProductFeature::with(
        [
          'movement' => function ($query) use ($from_date, $thru_date) {
            return $query
              ->select('id', 'product_id', 'product_feature_id', 'goods_id', 'material_transfer_id', 'type_movement', 'material_transfer_item_id', 'material_transfer_item_realisation_id', 'date', DB::raw('sum(qty) as final_qty'))
              ->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date])
              ->groupBy('product_feature_id', 'type_movement');
          },
          'last_movement' => function ($query) use ($from_date) {
            return $query
              ->select('id', 'product_id', 'product_feature_id', 'goods_id', 'material_transfer_id', 'type_movement', 'material_transfer_item_id', 'material_transfer_item_realisation_id', 'date', DB::raw('sum(qty) as final_qty'))
              ->where('date', '<', $from_date);
          },
          'product_category'
        ]
      )
        ->whereHas('product_category', function ($query) use ($cat_lvl) {
          return $query
            ->whereIn('product_category_id', $cat_lvl);
        })
        ->whereHas('movement', function ($query) use ($from_date, $thru_date) {
          return $query
            ->whereBetween(DB::raw('DATE(date)'), [$from_date, $thru_date]);
        })
        ->get();

      $convert = $query->map(function ($item) {
        $product = $item->product ? $item->product : null;
        $goods = $product ? $product->goods : null;

        $qty_pemasukan = 0;
        $qty_pengeluaran = 0;

        if (count($item->movement) >= 1) {
          foreach ($item->movement as $key) {
            # code...
            // find incoming goods to a facility
            if ($key->type_movement === 1) {
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

  public function repMutasiV2(Request $request)
  {
    $type = $request->query('type_of_facility');
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');

    if (empty($fromDate) || empty($thruDate)) {
      $thruDate = date('Y-m-d');
      $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
      $fromDate = date_format($fromDate, 'Y-m-d');
    }

    try {
      //code...

      $import_f = 1; //import

      $salesOrder = [];
      $purchaseOrder = [];

      $salesOrder = SalesOrder::select('order_id')->where('export_flag', 1)->get()->map(function ($item) {
        return $item->order_id;
      })->toArray();
      $purchaseOrder = PurchaseOrder::select('order_id')->where('import_flag', 1)->get()->map(function ($item) {
        return $item->order_id;
      })->toArray();

      $order_id = array_merge($salesOrder, $purchaseOrder);

      $order_item = OrderItem::select('product_feature_id')->whereIn('order_id', $order_id)->groupBy('product_feature_id')->get()->map(function ($item) {
        return $item->product_feature_id;
      });

      $query = GoodsMovement::select('id', 'date', 'material_transfer_id', 'material_transfer_item_id', 'product_id', 'product_feature_id', 'goods_id', 'facility_id', 'order_item_id', 'type_movement', DB::raw('sum(qty) as qty'))
        ->with('product', 'product_feature', 'goods', 'facility')
        ->where('facility_id', $type)
        ->where('import_flag', $import_f)
        ->whereIn('product_feature_id', $order_item)
        ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
        ->groupBy('product_feature_id', 'type_movement')
        ->get()
        ->map(function ($item, $index) use ($fromDate) {
          $productFeature = $item->product_feature;
          $product = $item->product ? $item->product : null;
          $goods = $item->goods ? $item->goods : null;

          $order_item = OrderItem::find($item->order_item_id);
          $purchase_order = null;
          $import_flag = 1;
          $costing_item = null;
          $shipment = null;
          $import_doc = null;
          $inv = null;
          $vb_attachment = null;

          if ($order_item) {
            $purchase_order = PurchaseOrder::where('order_id', $order_item->order_id)->get();
            if (count($purchase_order) > 0) {
              $import_flag = $purchase_order[0]->import_flag ? 2 : 1;
              $inv = Invoice::with('vendor_bills_attachment')->where('order_id', $order_item->order_id)->first();
              if (isset($inv['vendor_bills_attachment'])) {
                $vb_attachment = $inv['vendor_bills_attachment'];
              }
            }


            $temp_shipment = Shipment::where('order_id', $order_item->order_id)->get();
            if (count($temp_shipment)) {
              $shipment = $temp_shipment[0];
            }

            if (isset($order_item->costing_item_id)) {
              $temp = BOMItem::find($order_item->costing_item_id);

              if ($temp) {
                $costing_item = $temp;
              }
            }

            $temp_id = ImportDoc::where('order_id', $order_item->order_id)->get();
            if (count($temp_id)) {
              $import_doc = $temp_id[0];
            }
          }

          $initial_stock = GoodsMovement::select(DB::raw('sum(qty) as stock'))
            ->where('product_feature_id', $productFeature->id)
            ->where(DB::raw('DATE(date)'), '<', $fromDate)
            ->get();

          return [
            'id' => $index + 1,
            'initial_stock' => count($initial_stock) ? $initial_stock[0]['stock'] : 0,
            'date' => $item->date,
            'facility_name' => $item->facility ? $item->facility->name : '',
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'product_id' => $product->id,
            'product_feature_id' => $item->product_feature_id,
            'goods_id' => $goods->id,
            'purchase_order_id' => count($purchase_order) ? $purchase_order[0]->id : 0,
            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
            'unit_measurement' => $goods ? $goods->satuan : null,
            'type_movement' => $item->type_movement,
            'qty' => $item->qty,
            'costing_item_id' => $costing_item ? $costing_item->id : 0,
            'costing_id' => $costing_item ? $costing_item->bom_id : 0,
            'shipment_id' => $shipment ? $shipment->id : 0,
            'import_id' => $import_doc ? $import_doc->id : 0,
            'customs_document_number' => $import_doc ? $import_doc->document_number : 0,
            'pl_number' => $import_doc ? $import_doc->pl_number : 0,
            'bl_number' => $import_doc ? $import_doc->bl_number : 0,
            'invoice_id' => $inv ? $inv['id'] : null,
            'vendor_bills' => $inv ? $inv['reff_number'] : null,
            'vb_attachment' => $vb_attachment ? (isset($vb_attachment['url']) ? $vb_attachment['url'] : null) : null
          ];
        });

      // Step 2: Organize the data based on "item_name" and "type_movement"
      $organizedData = array();
      foreach ($query as $item) {
        $itemName = $item['product_feature_id'];
        $typeMovement = $item['type_movement'];
        if (!isset($organizedData[$itemName])) {
          $organizedData[$itemName] = array(
            'id' => $item['id'],
            'date' => $item['date'],
            'shipment_id' => $item['shipment_id'],
            'import_id' => $item['import_id'],
            'customs_document_number' => $item['customs_document_number'],
            'pl_number' => $item['pl_number'],
            'bl_number' => $item['bl_number'],
            'facility_name' => $item['facility_name'],
            'purchase_order_id' => $item['purchase_order_id'],
            'costing_item_id' => $item['costing_item_id'],
            'costing_id' => $item['costing_id'],
            'initial_stock' => $item['initial_stock'] ? $item['initial_stock'] : 0,
            "item_name" => $item['item_name'],
            "product_id" => $item['product_id'],
            "product_feature_id" => $item['product_feature_id'],
            "goods_id" => $item['goods_id'],
            "sku_id" => $item['sku_id'],
            "unit_measurement" => $item['unit_measurement'],
            "qty_in" => 0,
            "qty_out" => 0,
            "subcontractor_name" => '',
            "invoice_id" => $item['invoice_id'],
            "vendor_bills" => $item['vendor_bills'],
            "vb_attachment" => $item['vb_attachment']
          );
        }

        // Step 3: Sum up the quantities for "type_movement" 1 and 2 for each "item_name"
        if ($typeMovement == 1) {
          $organizedData[$itemName]['qty_in'] += $item['qty'];
        } elseif ($typeMovement == 2) {
          $organizedData[$itemName]['qty_out'] += $item['qty'];
        }
      }

      $result = array_values($organizedData);
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $result
    ]);
  }

  public function repMutasiHPV2(Request $request)
  {
    $type = $request->query('type_of_facility');
    $fromDate = $request->query('fromDate');
    $thruDate = $request->query('thruDate');

    if (empty($fromDate) || empty($thruDate)) {
      $thruDate = date('Y-m-d');
      $fromDate = date_sub(date_create($thruDate), date_interval_create_from_date_string("14 days"));
      $fromDate = date_format($fromDate, 'Y-m-d');
    }

    try {
      //code...

      $import_f = 0; //import

      $salesOrder = [];

      $salesOrder = SalesOrder::select('order_id')->where('export_flag', 1)->get()->map(function ($item) {
        return $item->order_id;
      })->toArray();

      $order_item = OrderItem::select('product_feature_id')->whereIn('order_id', $salesOrder)->groupBy('product_feature_id')->get()->map(function ($item) {
        return $item->product_feature_id;
      });

      $query = GoodsMovement::select('id', 'date', 'material_transfer_id', 'material_transfer_item_id', 'product_id', 'product_feature_id', 'goods_id', 'facility_id', 'order_item_id', 'type_movement', DB::raw('sum(qty) as qty'))
        ->with('product', 'product_feature', 'goods', 'facility')
        ->where('facility_id', $type)
        ->where('import_flag', $import_f)
        ->whereIn('product_feature_id', $order_item)
        ->whereBetween(DB::raw('DATE(date)'), [$fromDate, $thruDate])
        ->groupBy('product_feature_id', 'type_movement')
        ->get()
        ->map(function ($item, $index) use ($fromDate) {
          $productFeature = $item->product_feature;
          $product = $item->product ? $item->product : null;
          $goods = $item->goods ? $item->goods : null;

          $order_item = OrderItem::find($item->order_item_id);
          $sales_order = null;
          $import_flag = 1;
          $costing_item = null;
          $shipment = null;
          $export_doc = null;
          $rhso = null;

          if ($order_item) {
            $temp_so = SalesOrder::where('order_id', $order_item->order_id)->get();
            if (count($temp_so) > 0) {
              $sales_order = $temp_so[0];
              //     $import_flag = $sales_order->import_flag ? 2 : 1;
              $temp_rhso = Reconcile::where('sales_order_id', $sales_order->id)->get();
              if (count($temp_rhso)) {
                $rhso = $temp_rhso[0];
              }
            }

            $temp_shipment = Shipment::where('order_id', $order_item->order_id)->get();
            if (count($temp_shipment)) {
              $shipment = $temp_shipment[0];
            }

            $temp_ed = ExportDoc::where('order_id', $order_item->order_id)->get();
            if (count($temp_ed)) {
              $export_doc = $temp_ed[0];
            }
          }

          $initial_stock = GoodsMovement::select(DB::raw('sum(qty) as stock'))
            ->where('product_feature_id', $productFeature->id)
            ->where(DB::raw('DATE(date)'), '<', $fromDate)
            ->get();

          return [
            'id' => $index + 1,
            'initial_stock' => count($initial_stock) ? $initial_stock[0]['stock'] : 0,
            'date' => $item->date,
            'facility_name' => $item->facility ? $item->facility->name : '',
            'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
            'product_id' => $product->id,
            'product_feature_id' => $item->product_feature_id,
            'goods_id' => $goods->id,
            'sales_order_id' => $sales_order ? $sales_order->id : 0,
            'sku_id' => str_pad($import_flag, 2, '0', STR_PAD_LEFT) . '-' . str_pad($goods->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($product->id, 4, '0', STR_PAD_LEFT) . '-' . str_pad($productFeature->id, 4, '0', STR_PAD_LEFT),
            'unit_measurement' => $goods ? $goods->satuan : null,
            'type_movement' => $item->type_movement,
            'qty' => $item->qty,
            'costing_id' => $rhso ? $rhso->costing_id : 0,
            'shipment_id' => $shipment ? $shipment->id : 0,
            'export_id' => $export_doc ? $export_doc->id : 0,
            'export_document_number' => $export_doc ? $export_doc->document_number : 0,
            // 'pl_number' => $export_doc ? $export_doc : 0,
            'bl_number' => $export_doc ? $export_doc->bl_number : 0
          ];
        });

      // Step 2: Organize the data based on "item_name" and "type_movement"
      $organizedData = array();
      foreach ($query as $item) {
        $itemName = $item['product_feature_id'];
        $typeMovement = $item['type_movement'];
        if (!isset($organizedData[$itemName])) {
          $organizedData[$itemName] = array(
            'id' => $item['id'],
            'date' => $item['date'],
            'shipment_id' => $item['shipment_id'],
            'export_document_id' => $item['export_id'],
            'facility_name' => $item['facility_name'],
            'export_document_number' => $item['export_document_number'],
            // 'pl_number' => $item['pl_number'],
            'bl_number' => $item['bl_number'],
            'sales_order_id' => $item['sales_order_id'],
            'costing_id' => $item['costing_id'],
            'initial_stock' => $item['initial_stock'] ? $item['initial_stock'] : 0,
            "item_name" => $item['item_name'],
            "product_id" => $item['product_id'],
            "product_feature_id" => $item['product_feature_id'],
            "goods_id" => $item['goods_id'],
            "sku_id" => $item['sku_id'],
            "unit_measurement" => $item['unit_measurement'],
            "qty_in" => 0,
            "qty_out" => 0
          );
        }

        // Step 3: Sum up the quantities for "type_movement" 1 and 2 for each "item_name"
        if ($typeMovement == 1) {
          $organizedData[$itemName]['qty_in'] += $item['qty'];
        } elseif ($typeMovement == 2) {
          $organizedData[$itemName]['qty_out'] += $item['qty'];
        }
      }

      $result = array_values($organizedData);
    } catch (\Throwable $th) {
      //throw $th;
      return response()->json([
        'success' => false,
        'error' => $th->getMessage()
      ]);
    }

    return response()->json([
      'success' => true,
      'data' => $result
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
