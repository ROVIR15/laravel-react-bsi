<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product\ProductFeature;
use App\Http\Resources\Facility\Facility;

class Inventory extends JsonResource
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
            'id' => $this->product_feature_id,
            'facility' => new Facility($this->facility),
            'product' => new ProductFeature($this->product_feature),
            'qty_on_hand' => $this->qty
        ];
    }
}
