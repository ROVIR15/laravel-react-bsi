<?php

namespace App\Http\Resources\Product;

use App\Models\Product\ProductCategory;
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
        $cat = ProductCategory::find($this->product_category->product_category_id);
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product_category_id' => $this->product_category->product_category_id,
            'goods_id' => $this->product->goods_id,
            'name' => $this->product->goods['name'],
            'brand' => $this->product->goods['brand'],
            'value' => $this->product->goods['value'],
            'imageUrl' => $this->product->goods['imageUrl'],
            'color' => $this->color,
            'size' => $this->size,
            'category' => $cat->name,
            'price_component_id' => $this->price_component_id,
            'facility_id' => $this->inventory->facility_id
        ];
    }
}
