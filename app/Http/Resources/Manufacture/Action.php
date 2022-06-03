<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;

class Action extends JsonResource
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
            'action' => $this->action,
            'manufacture_operation_id' => $this->manufacture_operation_id,
            'manufacture_id' => $this->manufacture_id,
            'time' => $this->time
        ];
    }
}
