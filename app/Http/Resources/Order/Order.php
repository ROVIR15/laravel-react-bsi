<?php

  namespace App\Http\Resources\Order;
  use Illuminate\Http\Resources\Json\JsonResource;


  class Order extends JsonResource
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
        'order_type_id' => $this->order_type_id,
        'creation_time' => $this->creation_time
      ];
    }
  }

?>
