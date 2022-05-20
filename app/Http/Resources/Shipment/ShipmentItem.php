<?php

namespace App\Http\Resources\Shipment;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Order\OrderItem;

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
            'order_item' => new OrderItem($this->order_item),
            'qty_shipped' => $this->qty_shipped
        ];
    }
}
