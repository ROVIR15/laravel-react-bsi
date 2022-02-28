<?php

namespace App\Http\Resources\Shipment;

use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderShipmentCollection extends ResourceCollection
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
            'data' => $this->collection
        ];
    }
}
