<?php

namespace App\Http\Resources\Party;

use Illuminate\Http\Resources\Json\JsonResource;

class Party extends JsonResource
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
            'party_type' => $this->party_type,
            'agreement_role_id' => $this->agreement_role_id            
        ];
    }
}
