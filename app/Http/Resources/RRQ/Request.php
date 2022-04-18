<?php

namespace App\Http\Resources\RRQ;

use App\Http\Resources\RRQ\RequestItemCollection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class Request extends JsonResource
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
          'req_type' => $this->req_type,
          'party_id' => $this->party_id,
          'ship_to' => $this->ship_to,
          'po_number' => $this->po_number,
          'po_date' => $this->po_date,
          'delivery_date' => $this->delivery_date,
          'valid_to' => $this->valid_to,
          'inquiry_item' => new RequestItemCollection($this->request_item)
        ];
    }
}
