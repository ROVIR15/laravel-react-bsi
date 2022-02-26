<?php

namespace App\Http\Resources\Party;

use Illuminate\Http\Resources\Json\ResourceCollection;

class Status extends ResourceCollection
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
            'data' => $this.collection
        ];
    }
}
