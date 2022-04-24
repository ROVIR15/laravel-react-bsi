<?php

namespace App\Http\Resources\Study;

use Illuminate\Http\Resources\Json\JsonResource;

class ProcessStudy extends JsonResource
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
            'production_study_id' => $this->production_study_id,
            'party_id' => $this->party_id
        ];
    }
}
