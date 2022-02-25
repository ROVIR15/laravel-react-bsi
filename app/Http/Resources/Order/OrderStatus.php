<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderStatus extends JsonResource
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
        'status_type' => $this->status_type,
        'created_at' => $this->created_at,
        'order_id' => $this->order_id,
        'updated_at' => $this->updated_at
      ];
    }
}
