<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentItem extends Model
{
    protected $table = 'shipment_item';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;
    
    protected $fillable = [
        'id',
        'order_shipment_id',
        'item_issuance_id'
    ];
}
