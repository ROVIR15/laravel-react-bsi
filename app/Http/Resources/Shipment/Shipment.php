<?php

namespace App\Http\Resources\Shipment;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Party\Party;
use App\Http\Resources\Shipment\ShipmentItemCollection;
use App\Http\Resources\Shipment\ItemIssuance;
use App\Http\Resources\Shipment\ItemIssuanceCollection;

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
            'sales' => $this->sales_info,
            'buyer' => new Party($this->buyer),
            'ship' => new Party($this->ship),
            'items' => new ShipmentItemCollection($this->item),
            'issued_goods' => $this->issued_goods->count()
        ];
    }
}
