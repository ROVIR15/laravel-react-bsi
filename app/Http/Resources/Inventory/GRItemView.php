<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product\ProductFeature;

class GRItemView extends JsonResource
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
            'goods_receipt_id' => $this->goods_receipt_id,
            'product' => new ProductFeature($this->product_info),
            'qty_order' => $this->qty_order,
            'qty_received' => $this->qty_received,
            'qty_on_receipt' => $this->qty_on_receipt
        ];
    }
}
