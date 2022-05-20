<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Party\Party;

class GoodsReceipt extends JsonResource
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
            'bought_from' => $this->party->name,
            'issue_date' => $this->issue_date,
            'facility' => $this->facility
        ];
    }
}
