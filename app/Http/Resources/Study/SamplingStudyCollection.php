<?php

namespace App\Http\Resources\Study;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SamplingStudyCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return ['data' => $this->collection];
    }
}
