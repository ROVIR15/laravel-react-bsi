<?php

namespace App\Http\Resources\Party;

use App\Http\Resources\Party\Address;
use App\Http\Resources\Party\Party; 
use App\Http\Resources\Party\PartyRoles;
use App\Http\Resources\Party\Relationship;
use App\Http\Resources\Party\Status;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BuyerCollection extends ResourceCollection
{
    private $addressResources;
    private $partyResources;
    private $statusResources;

    /**
     * Create a new resource instance.
     *
     * @param  mixed  $resource
     * @return void
     */
    public function __construct($buyerResources, $partyResources, $partyRolesResource, $relationshipResources, $statusResources)
    {
        parent::__construct($buyerResources);
        $this->resource = $buyerResources;

        $this->addressResources = $addressResources;
        $this->partyResources = $partyResources;
        $this->statusResources = $statusResources;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'buyer' => new Party($this->partyResouces),
            'address' => new Address($this->addressResources),
            'status' => new Status($this->statusResources)
        ];
    }
}
