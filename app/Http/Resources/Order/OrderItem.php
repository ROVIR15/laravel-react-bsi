<?php
  
  namespace App\Http\Resources\Order;
  use Illuminate\Http\Resources\Json\JsonResource;
  use App\Http\Resources\Product\ProductFeature;

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
        'id' => $this->id,
        'order_id' => $this->order_id,
        'qty' => $this->qty,
        'unit_price' => $this->unit_price,
        'cm_price' => $this->cm_price,
        'shipment_estimated' => $this->shipment_estimated,
        'product_feature' => $this->product_feature
      ];
    }
  }
?>
