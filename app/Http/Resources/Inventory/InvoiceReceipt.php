<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceReceipt extends JsonResource
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
            'purchase_order_id' => $this->purchase_order_id,
            'amount' => $this->amount,
            'qty' => $this->qty,
            'invoice_receipt' => $this->invoice_receipt,
            'posting_date' => $this->posting_date
        ];
    }
}
