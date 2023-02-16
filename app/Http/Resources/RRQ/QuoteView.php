<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Party\Party;

class QuoteView extends JsonResource
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
            'currency_id' => $this->currency_id,
            'po_number' => $this->po_number,
            'sold_to' => $this->party->id,
            'ship_to' => $this->ship->id,
            'party' => new Party($this->party),
            'ship' => new Party($this->ship),
            'request_id' => $this->request_id,
            'issue_date' => $this->issue_date,
            'valid_thru' => $this->valid_thru,
            'delivery_date' => $this->delivery_date,
            'status' => $this->status,
            'sum' => $this->sum
        ];
    }
}
