<?php

namespace App\Http\Resources\Manufacture;

use App\Http\Resources\Product\ProductFeature;
use Illuminate\Http\Resources\Json\JsonResource;

class BOMItem extends JsonResource
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
            'bom_id' => $this->bom_id,
            'product_feature_id' => $this->product_feature_id,
            'qty' => $this->qty,
            'product_feature' => new ProductFeature($this->product_feature)
        ];
    }
}
