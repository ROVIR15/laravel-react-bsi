<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceReceiptItems extends JsonResource
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
            'invoice_receipt_id' => $this->invoice_receipt_id,
            'order_item_id' => $this->order_item_id,
            'order_item_order_id' => $this->order_item_order_id,
            'amount' => $this->amount,
            'qty' => $this->qty
        ];
    }
}
