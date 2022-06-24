<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Manufacture\BOM;
use App\Models\Manufacture\BOMComponent;
use App\Models\Manufacture\Operation;
use App\Models\Manufacture\BOMItem;

use App\Models\Product\Product;
use App\Models\Product\ProductFeature;

use App\Http\Resources\Product\ProductFeature as ProductFeatureOne;

use Illuminate\Support\Facades\DB;

class BOMDocumentController extends Controller
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
      $query = DB::table('bom_operation_wc_view')->get();

      return response()->json($query);
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
            $bomInfo = BOM::find($id);
            $name = DB::table('products_view')->where('product_feature_id', $bomInfo->product_feature_id);
            $qpf = ProductFeature::find($bomInfo->product_feature_id);
        
            $pf = new ProductFeatureOne($qpf);

            $query = DB::table('bom_operation_wc_view')
            ->where('bom_id', $id)
            ->groupBy('bom_id')
            ->selectRaw('bom_id, sum(labor_alloc) as total_labor, count(bom_id) as many_operations, sum(calculated_cost) as total_cost, sum(overhead_cost) as total_overhead')
            ->get();

            $query2 = DB::table('bom_component_views')
            ->where('bom_id', $id)
            ->groupBy('bom_id')
            ->selectRaw('*, sum(total_goods_value) as total_goods, count(bom_id) as many_components')
            ->get();

            $data = [
                'bom_id' => $bomInfo->id,
                'qty_to_produce' => $bomInfo->qty,
                'bom_name' => $query2[0]->bom_name,
                'goods_name' => $pf->name,
                'imageUrl' => $pf->imageUrl,
                'color' => $pf->color,
                'size' => $pf->size,
                'start_date' => $bomInfo->start_date,
                'end_date' => $bomInfo->end_date,
                'total_labor' => $query[0]->total_labor,
                'many_operations' => $query[0]->many_operations,
                'many_components' => $query2[0]->many_components,
                'total_cost' => $query[0]->total_cost,
                'total_overhead' => $query[0]->total_overhead,
                'total_goods' => $query2[0]->total_goods
            ];
            return response()->json([
                'success' => true,
                'data' => $data
            ]);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'erro' => $th->getMesssage()
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
    public function update(Request $request, X $x)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy(X $x)
    {

    }
}
