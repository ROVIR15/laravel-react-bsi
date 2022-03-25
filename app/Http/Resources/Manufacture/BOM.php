<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;

class BOM extends JsonResource
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
            'product_id' => $this->product_id,
            'product_feature_id' => $this->product_feature_id,
            'name' => $this->name,
            'qty' => $this->qty,
            'company_name' => $this->company_name,
            'bom_items' => $this->bom_items,
            'product_info' => $this->product_info
        ];
    }
}
