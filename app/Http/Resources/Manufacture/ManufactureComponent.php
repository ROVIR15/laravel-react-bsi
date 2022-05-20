<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product\ProductFeature;

class ManufactureComponent extends JsonResource
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
            'manufacture_id' => $this->manufacture_id,
            'product_feature' => new ProductFeature($this->inventory_item),
            'qty_to_be_consumed' => $this->qty_to_be_consumed
        ];
    }
}
