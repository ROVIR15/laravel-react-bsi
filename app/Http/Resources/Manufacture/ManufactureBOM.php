<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;

class ManufactureBOM extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return new BOM($this->bom);
    }
}
