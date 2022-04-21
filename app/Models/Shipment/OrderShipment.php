<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class OrderShipment extends Model
{
    protected $table = 'order_item_shipment';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;
    
    protected $fillable = [
        'id'
    ];
}
