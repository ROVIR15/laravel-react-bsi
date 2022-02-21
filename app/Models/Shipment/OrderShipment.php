<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class OrderShipment extends Model
{
    protected $table = 'order_shipment';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
