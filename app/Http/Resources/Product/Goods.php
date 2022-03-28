<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class Goods extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'unit_measurement' => $this->satuan,
            'value' => $this->value,
            'brand' => $this->brand,
            'product_id' => DB::table("product as p")
            ->select('p.id')
            ->where('p.goods_id', '=', $this->id)
            ->get(),
            'category' => DB::table("product as p")
            ->leftJoin("product_has_category as phc", function($join){
              $join->on("phc.product_id", "=", "p.id");
            })
            ->leftJoin("product_category as pc", function($join){
              $join->on("phc.product_category_id", "=", "pc.id");
            })
            ->select('pc.name', 'pc.id')
            ->where('p.goods_id', '=', $this->id)
            ->limit(1)
            ->get(),
            'goods_items' => DB::table("goods as g")
            ->join("product as p", function($join){
              $join->on("g.id", "=", "p.goods_id");
            })
            ->join("product_feature as pf", function($join){
              $join->on("p.id", "=", "pf.product_id");
            })
            ->select("pf.id", "pf.size", "pf.color")
            ->where("g.id", "=", $this->id)
            ->get()
        ];
    }
}