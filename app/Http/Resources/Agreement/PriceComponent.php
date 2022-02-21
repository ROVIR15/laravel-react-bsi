<?php

namespace App\Http\Resources\Agreement;

use Illuminate\Http\Resources\Json\JsonResource;

class PriceComponent extends JsonResource
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
            'agreement_item_id' => $this->agreement_item_id
        ];
    }
}
