<?php
  
  namespace App\Http\Resources\Order;
  use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Order\OrderItemCollection;
use App\Http\Resources\Party\Party;
  
  class PurchaseOrder extends JsonResource
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
        'po_number' => $this->po_number,
        'bought_from' => $this->bought_from,
        'issue_date' => $this->issue_date,
        'party' => new Party($this->party),
        'ship' => new Party($this->ship),
        'delivery_date' => $this->delivery_date,
        'valid_thru' => $this->valid_thru,
        'order_item' => new OrderItemCollection($this->order_item)
      ];
    }
  }
?>
