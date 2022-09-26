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
          'po_number' => $this->po_number,
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at,
          'inquiry_item' => new RequestItemCollection($this->request_item)
        ];
    }
}
