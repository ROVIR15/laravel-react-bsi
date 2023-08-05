<?php

namespace App\Http\Controllers;

use App\Models\Inventory\Scrap;
use App\Models\Inventory\ScrapItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScrapController extends Controller
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
        try {
            //code...
            $query = Scrap::with('items')->get()->map(function ($query) {
                $arr = $query->items;

                return ([
                    'id' => $query->id,
                    'document_number' => $query->document_number,
                    'date' => $query->date,
                    'type' => 'BC 2.4',
                    'banyaknya' => $arr->count(),
                    'jumlah_barang' => $arr->sum('qty')
                ]);
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
            'data' => $query
        ], 200);
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
            DB::beginTransaction();

            $query = Scrap::create([
                'document_number' => $param['document_number'],
                'date' => $param['date']
            ]);

            DB::commit();

            $__items = [];

            foreach ($param['items'] as $item) {
                array_push($__items, [
                    'product_id' => $item['product_id'],
                    'product_feature_id' => $item['product_feature_id'],
                    'order_id' => $item['order_id'],
                    'order_item_id' => $item['order_item_id'],
                    'qty' => $item['qty'],
                    'scrap_id' => $query->id
                ]);
            }

            ScrapItem::insert($__items);

            DB::commit();
        } catch (Exception $th) {
            DB::resolved();
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true
        ], 200);
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
            $query = Scrap::with(['items' => function($query) {
                return $query->with('product_feature', 'product');
            }])->find($id);

            $items = $query->items->map(function($query){
                $productFeature = $query->product_feature;
                $product = $query->product ? $query->product : null;
                $goods = $product ? $product->goods : null;
        
                return [
                    'id' => $query->id,
                    'product_id' => $query->product_id,
                    'product_feature_id' => $query->product_feature_id,
                    'order_id' => $query->order_id,
                    'order_item_id' => $query->order_item_id,
                    'qty' => $query->qty,
                    'unit_measurement' => $goods->satuan,
                    'item_name' => $goods ? $goods->name . ' - ' . $productFeature->color . ' ' . $productFeature->size : null,
                ];
            });

            $query2 = Scrap::find($id);

        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true,
            'data' => $query2,
            'items' => $items
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
        $param = $request->all()['payload'];
        try {
            Scrap::find($id)->update($param);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'errors' => $e->getMessage()
            ], 500);
        }
        return response()->json([
            'success' => true
        ], 200);
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
            Scrap::find($id)->delete();
            return response()->json(['success' => true], 200);
        } catch (Exception $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'errors' => $th->getMessage()
            ]);
        }
    }
}
