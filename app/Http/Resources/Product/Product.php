<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
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
            'service_id' => $this->service_id,
            'goods_id' => $this->goods_id,
            'part_id' => $this->part_id,
            'id' => $this->id,
            'name' => $this->goods['name'],
            'brand' => $this->goods['brand']
        ];
    }
}
