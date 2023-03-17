<?php

namespace App\Http\Resources\Order;

use App\Models\Order\OrderItem;

use App\Http\Resources\Order\OrderItemCollection;
use App\Http\Resources\Product\ProductFeatureCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Party\Party;

class SalesOrder extends JsonResource
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
            'invoice' => $this->invoice,
            'order_id' => $this->order_id,
            'order' => $this->order,
            'sold_to' => $this->sold_to,
            'ship_to' => $this->ship_to,
            'party' => new Party($this->party),
            'ship' => new Party($this->ship),
            'po_number' => $this->po_number,
            'issue_date' => $this->issue_date,
            'delivery_date' => $this->delivery_date,
            'valid_thru' => $this->valid_thru,
            'order_item' => new OrderItemCollection($this->order_item),
            'completion_status' => $this->completion_status,
            'status' => $this->status
        ];
    }
}
