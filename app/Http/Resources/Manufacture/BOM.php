<?php

namespace App\Http\Resources\Manufacture;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product\ProductFeature;
use App\Http\Resources\Manufacture\WorkCenterCollection;
use App\Http\Resources\Manufacture\OperationCollections;
use App\Http\Resources\Manufacture\BOMItemCollection;
use App\Http\Resources\Manufacture\BOMServiceCollection;

class BOM extends JsonResource
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
            'product_id' => $this->product_id,
            'product_feature_id' => $this->product_feature_id,
            'name' => $this->name,
            'qty' => $this->qty,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'company_name' => $this->company_name,
            'bom_services' => new BOMServiceCollection($this->bom_services),
            'bom_items' => new BOMItemCollection($this->bom_items),
            'operations' => new OperationCollection($this->operation),
            'variants' => $this->variants,
            'product' => $this->product
        ];
    }
}