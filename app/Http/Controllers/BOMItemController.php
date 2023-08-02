<?php

namespace App\Http\Controllers;


use Carbon\Carbon;

use App\Models\Manufacture\BOM;
use App\Models\Manufacture\BOMItem;

use App\Http\Resources\Manufacture\BOMItem as BOMItemOneCollection;
use App\Http\Resources\Manufacture\BOMItemCollection;
use App\Models\Product\ProductFeature;
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

    public function getCostingId()
    {
        try {
            $query = BOM::select('id', 'name')->get();
            
        } catch (\Throwable $th) {
            //throw $th;

            return response()->json([
                'error' => $th->getMessage()()
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $query
        ]);
    }

    public function findItemsByCostingId($costing_id)
    {

        try {
            $query = BOMItem::with('product_feature')->where('bom_id', $costing_id)->get()->map(function ($data) {
                $query2 = ProductFeature::select('product_id', 'id')
                    ->where('id', $data['product_feature_id'])
                    ->get();

                if ($data['product_id'] === 0) {
                    BOMItem::where('id', $data['id'])->update(['product_id' => $query2[0]['product_id']]);
                    $status = 'updated product id on costing item';
                }

                return $query2[0]['product_id'];
            });

            $items = ProductFeature::with('product', 'product_category')->whereIn('product_id', $query)->get()->map(function ($query) use ($costing_id) {
                $product = $query->product ? $query->product : null;
                $goods = $product ? $product->goods : null;

                $query3 = BOMItem::select('unit_price', 'id as costing_item_id')->where('bom_id', $costing_id)->where('product_id', $query->product_id)->get();
                return
                    [
                        'id' => $query['id'],
                        'product_id' => $query['product_id'],
                        'product_feature_id' => $query['id'],
                        'item_name' => $goods ? $goods->name . ' - ' . $query->color . ' ' . $query->size : null,
                        'unit_measurement' => $goods ? $goods->satuan : null,
                        'brand' => $goods ? $goods->brand : null,
                        'category_id' => $query->product_category->product_category_id,
                        'category' => $query->product_category ? $query->product_category->category->name . ' - ' . $query->product_category->category->sub->name : null,
                        'unit_price' => count($query3) ? $query3[0]['unit_price'] : 0,
                        'costing_item_id' => count($query3) ? $query3[0]['costing_item_id'] : 0
                    ];
            });
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $items
        ], 200);
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

            foreach ($param as $key) {
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
