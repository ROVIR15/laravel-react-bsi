<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;

class RequirementHasRequestItem extends JsonResource
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
            'request_item_id' => $this->request_item_id
        ];
    }
}
