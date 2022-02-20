<?php
  
  namespace App\Http\Resources\Order;
  use Illuminate\Http\Resources\Json\JsonResource;
  
  
  class OrderItem extends JsonResource
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
        'order_id' => $this->order_id,
        'qty' => $this->qty,
        'unit_price' => $this->unit_price,
        'shipment_estimated' => $this->shipment_estimated,
        'product_id' => $this->product_id
      ];
    }
  }
?>
