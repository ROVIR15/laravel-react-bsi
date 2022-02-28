<?php

namespace App\Http\Resources\Shipment;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ShipmentReceiptCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
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
