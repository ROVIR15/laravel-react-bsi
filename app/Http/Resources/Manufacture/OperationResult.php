<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Manufacture\MOResultCollection;

class OperationResult extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $tempStatus = (object) [
            'action' => 'none'
        ];
        if(count($this->status)) $tempStatus = $this->status[0];
        return [
            'id' => $this->id, 
            'manufacture' => $this->manufacture, 
            'operation' => $this->operation, 
            'result' => new MOResultCollection($this->result),
            'status' => $tempStatus
        ];
    }
}
