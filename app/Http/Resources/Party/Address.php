<?php

namespace App\Http\Resources\Party;

use Illuminate\Http\Resources\Json\JsonResource;

class Address extends JsonResource
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
            'party_id' => $this->party_id,
            'update_time' => $this->update_time            
        ];
    }
}
