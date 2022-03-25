<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\RRQ\QuoteItemCollection;

class Quote extends JsonResource
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
            'po_number' => $this->po_number,
            'issue_date' => $this->issue_date,
            'valid_thru' => $this->valid_thru,
            'delivery_date' => $this->delivery_date,
            'quote_items' => new QuoteItemCollection($this->quote_item)
        ];
    }
}
