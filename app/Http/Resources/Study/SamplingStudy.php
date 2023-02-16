<?php

namespace App\Http\Resources\Study;

use Illuminate\Http\Resources\Json\JsonResource;

class SamplingStudy extends JsonResource
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
            'product' => $this->product,
            'work_center' => $this->work_center,
            'data' => $this->data
        ];
    }
}
