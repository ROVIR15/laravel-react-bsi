<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Manufacture\BOM;
use App\Http\Resources\Manufacture\Manufacture;

class ManufactureShow extends JsonResource
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
            'bom' => new BOM($this->bom),
            'manufacture' => new Manufacture($this->manufacture),
            'logs' => $this->logs
        ];
    }
}
