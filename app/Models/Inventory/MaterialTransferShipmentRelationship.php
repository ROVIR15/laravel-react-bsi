<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class MaterialTransferShipmentRelationship extends Model
{
    protected $table = 'material_transfer_shipment_relationship';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'material_transfer_id',
        'shipment_id'
    ];
    
    public function shipment(){
        return $this->belongsTo('App\Models\Shipment\Shipment', 'shipment_id')->with('ship_to', 'order');
    }
}
