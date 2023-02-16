<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class Service extends JsonResource
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
            'product_id' => DB::table("product as p")
            ->select('p.id')
            ->where('p.service_id', '=', $this->id)
            ->get()[0],
            'category' => DB::table("product as p")
            ->leftJoin("product_has_category as phc", function($join){
              $join->on("phc.product_id", "=", "p.id");
            })
            ->leftJoin("product_category as pc", function($join){
              $join->on("phc.product_category_id", "=", "pc.id");
            })
            ->select('pc.name', 'pc.id')
            ->where('p.service_id', '=', $this->id)
            ->limit(1)
            ->get()[0]
        ];
    }
}
