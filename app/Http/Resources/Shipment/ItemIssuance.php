<?php

namespace App\Http\Resources\Shipment;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemIssuance extends JsonResource
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
            'shipment_id' => $this->shipment_id,
            'shipment_item_id' => $this->shipment_item_id,
            'item_issued' => $this->item_issued
        ];
    }
}
