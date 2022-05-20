<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Inventory\GRItemViewCollection;
use App\Http\Resources\Party\Party;

class GRView extends JsonResource
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
            'purchase_order_id' => $this->purchase_order_id,
            'po_number' => $this->po_number,
            'bought_from' => new Party($this->party),
            'issue_date' => $this->issue_date,
            'delivery_date' => $this->delivery_date,
            'valid_thru' => $this->valid_thru,
            'GR_Items' => new GRItemViewCollection($this->items),
            'facility' => $this->facility
        ];
    }
}
