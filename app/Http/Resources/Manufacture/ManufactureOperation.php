<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Manufacture\OperationCollection;

class ManufactureOperation extends JsonResource
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
            'manufacture_id' => $this->manufacture_id,
            'operation' => $this->operation
        ];
    }
}
