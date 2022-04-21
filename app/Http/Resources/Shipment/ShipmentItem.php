<?php

namespace App\Http\Resources\Shipment;

use Illuminate\Http\Resources\Json\JsonResource;

class ShipmentItem extends JsonResource
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
            'product_feature_id' => $this->product_feature_id,
            'qty_shipped' => $this->qty_shipped
        ];
    }
}
