<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;

class QuoteRole extends JsonResource
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
            'quote_id' => $this->quote_id 
        ];
    }
}
