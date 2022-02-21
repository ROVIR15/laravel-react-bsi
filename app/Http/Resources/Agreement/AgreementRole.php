<?php

namespace App\Http\Resources\Agreement;

use Illuminate\Http\Resources\Json\JsonResource;

class AgreementRole extends JsonResource
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
            'agreement_id' => $this->agreement_id
        ];
    }
}
