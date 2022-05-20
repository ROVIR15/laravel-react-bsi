<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class SOView extends JsonResource
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
            'order_id' => $this->order_id,
            'sold_to' => $this->party->name,
            'ship_to' => $this->ship->name,
            'po_number' => $this->po_number,
            'issue_date' => $this->issue_date,
            'delivery_date' => $this->delivery_date,
            'valid_thru' => $this->valid_thru
        ];

    }
}
