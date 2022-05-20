<?php

namespace App\Http\Resources\Invoice;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product\ProductFeature;

class SalesInvoiceItemView extends JsonResource
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
            'product_feature_id' => new ProductFeature($this->product_feature),
            'qty' => $this->qty,
            'amount' => $this->amount
        ];
    }
}
