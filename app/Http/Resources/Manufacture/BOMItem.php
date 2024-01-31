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
            'consumption' => $this->consumption,
            'allowance' => $this->allowance,
            'scrap_conversion' => $this->scrap_conversion,
            'unit_price' => $this->unit_price,
            'product_feature' => $this->product_feature
        ];
    }
}
