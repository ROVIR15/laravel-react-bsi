<?php

namespace App\Http\Resources\RRQ;

use Illuminate\Http\Resources\Json\JsonResource;

class RequestItem extends JsonResource
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
            'request_id' => $this->request_id    
        ];
    }
}
