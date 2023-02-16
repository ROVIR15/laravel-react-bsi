<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkCenter extends JsonResource
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
            'work_hours' => $this->work_hours,
            'company_name' => $this->company_name,
            'overhead_cost' => $this->overhead_cost,
            'prod_capacity' => $this->prod_capacity,
            'cost_per_hour' => $this->cost_per_hour,
            'oee_target' => $this->oee_target,
            'labor_alloc' => $this->labor_alloc,
            'goods_id' => $this->goods_id,
            'description' => $this->description,
            'goods' => $this->goods
        ];
    }
}
