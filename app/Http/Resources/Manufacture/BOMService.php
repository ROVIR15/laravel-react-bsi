<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;

class BOMService extends JsonResource
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
          'product_id' => $this->product_id,
          'product' => $this->product,
          'unit_price' => $this->unit_price
        ];
    }
}
