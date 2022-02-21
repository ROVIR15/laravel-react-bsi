<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;

class QuoteItem extends JsonResource
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
            'quote_id' => $this->quote_id,
            'order_item_id' => $this->order_item_id,
            'order_item_order_id' => $this->order_item_order_id,
            'request_item_id' => $this->request_item_id,
            'qty' => $this->qty
        ];
    }
}
