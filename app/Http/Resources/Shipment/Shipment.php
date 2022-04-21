<?php

namespace App\Http\Resources\Shipment;

use Illuminate\Http\Resources\Json\JsonResource;

class Shipment extends JsonResource
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
            'delivery_date' => $this->delivery_date,
            'total_weight' => $this->total_weight,
            'items' => $this->item
        ];
    }
}
