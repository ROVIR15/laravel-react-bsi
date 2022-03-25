<?php

namespace App\Http\Resources\Manufacture;

use App\Http\Resources\Manufacture\OperationCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class Operation extends JsonResource
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
            'seq' => $this->seq,
            'work_center_id' => $this->work_center_id,
            'bom_id' => $this->bom_id,
            'work_center_info' => new OperationCollection($this->work_center)
        ];
    }
}
