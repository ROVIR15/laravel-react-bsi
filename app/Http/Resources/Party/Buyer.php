<?php

namespace App\Http\Resources\Buyer;

use App\Http\Resources\Party\Address;
use App\Http\Resources\Party\Party; 
use App\Http\Resources\Party\PartyRoles;
use App\Http\Resources\Party\Relationship;
use App\Http\Resources\Party\Status;

use Illuminate\Http\Resources\Json\ResourceCollection;

class BuyerCollection extends ResourceCollection
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
            'buyer' => $this->collection
        ];
    }
}
