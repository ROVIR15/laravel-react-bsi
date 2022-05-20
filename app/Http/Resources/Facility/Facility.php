<?php

namespace App\Http\Resources\Facility;

use Illuminate\Http\Resources\Json\JsonResource;

class Facility extends JsonResource
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
            'name' => $this->name,
            'type' => $this->type
        ];
    }
}
