<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product\ProductFeature;

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
            'request_item_id' => $this->request_item_id,
            'product_feature_id' => $this->product_feature_id,
            'qty' => $this->qty,
            'unit_price' => $this->unit_price,
            'product' => $this->product_feature
        ];
    }
}
