<?php

namespace App\Http\Resources\Party;

use Illuminate\Http\Resources\Json\JsonResource;

class person extends JsonResource
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
            'id' => $this->id
        ];
    }
}
