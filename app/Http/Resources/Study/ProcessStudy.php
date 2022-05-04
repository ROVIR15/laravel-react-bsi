<?php

namespace App\Http\Resources\Study;

use Illuminate\Http\Resources\Json\JsonResource;

class ProcessStudy extends JsonResource
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
            'production_study_id' => $this->production_study_id,
            'labor_id' => $this->labor_id,
            'labor_name' => $this->labor_name,
            'process_id' => $this->process_id,
            'process_name' => $this->process_name
        ];
    }
}
