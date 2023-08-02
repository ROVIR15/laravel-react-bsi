<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class POView extends JsonResource
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
        'currency_id' => $this->order->currency_id ,
        'po_number' => $this->po_number,
        'party' => $this->party,
        'bought_from' => $this->party->name,
        'issue_date' => $this->issue_date,
        'delivery_date' => $this->delivery_date,
        'valid_thru' => $this->valid_thru,
        'status' => $this->status,
        'completion_status' => $this->completion_status,
        'sum' => $this->sum
      ];
    }
}
