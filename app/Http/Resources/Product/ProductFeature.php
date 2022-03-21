<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductFeature extends JsonResource
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
            'id' => $this->product_id,
            'goods_id' => $this->product->goods_id,
            'name' => $this->product->goods['name'],
            'brand' => $this->product->goods['brand'],
            'color' => $this->color,
            'size' => $this->size,
            'price_component_id' => $this->price_component_id
        ];
    }
}
