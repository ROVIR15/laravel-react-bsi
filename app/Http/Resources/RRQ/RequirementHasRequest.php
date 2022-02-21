<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;

class RequirementHasRequest extends JsonResource
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
            'requirement_id' => $this->requirement_id,
            'request_id' => $this->request_id
        ];
    }
}
