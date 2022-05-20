<?php

namespace App\Http\Resources\Invoice;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Party\Party;
use App\Http\Resources\Invoice\PurchaseInvoiceItemViewCollection;

class PurchaseInvoiceShow extends JsonResource
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
            'invoice_id' => $this->invoice_id,
            'po_number' => $this->po_number,
            'invoice_date' => $this->invoice_date,
            'bought_from' => new Party($this->party),
            'total_qty' => $this->total_qty,
            'total_price' => $this->total_price,
            'items' => new PurchaseInvoiceItemViewCollection($this->items)
        ];
    }
}
