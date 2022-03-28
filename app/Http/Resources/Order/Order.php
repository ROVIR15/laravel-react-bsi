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
        'sales_order_id' => $this->sales_order_id,
        'purchase_order_id' => $this->purchase_order_id,
        'created_at' => $this->created_at
      ];
    }
  }

?>
