<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentReceipt extends Model
{
    protected $table = 'shipment_receipt';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'order_shipment_id'
    ];
}
