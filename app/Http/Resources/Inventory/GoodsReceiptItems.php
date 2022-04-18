<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Resources\Json\JsonResource;

class GoodsReceiptItems extends JsonResource
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
            'goods_receipt_id' => $this->goods_receipt_id,
            'order_item_id' => $this->order_item_id,
            'order_item_order_id' => $this->order_item_order_id,
            'qty_received' => $this->qty_received,
            'qty_on_receipt' => $this->qty_on_receipt
        ];
    }
}
