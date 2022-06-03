<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Manufacture\ManufactureBOM;
use App\Http\Resources\Manufacture\ManufactureOperationCollection;
use App\Http\Resources\Manufacture\ManufactureComponentCollection;

class Manufacture extends JsonResource
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
            'party_id' => $this->party_id,
            'qty' => $this->qty,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'bom' => new ManufactureBOM($this->bom),
            'operations' => new ManufactureOperationCollection($this->operation),
            'components' => new ManufactureComponentCollection($this->component),
            'logs' => $this->logs,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
