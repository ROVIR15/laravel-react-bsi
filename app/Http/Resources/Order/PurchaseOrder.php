<?php
  
  namespace App\Http\Resources\Order;
  use Illuminate\Http\Resources\Json\JsonResource;
  use App\Http\Resources\Order\Order;
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
        'import_flag' => $this->import_flag,
        'order_id' => $this->order_id,
        'po_number' => $this->po_number,
        'issue_date' => $this->issue_date,
        'bought_from' => new Party($this->bought),
        'ship_to' => new Party($this->ship),
        'delivery_date' => $this->delivery_date,
        'valid_thru' => $this->valid_thru,
        'order' => $this->order,
        'order_item' => new OrderItemCollection($this->order_item),
        'status' => $this->status,
        'invoice' => $this->invoice,
        'import_doc' => $this->import_doc
      ];
    }
  }
?>
