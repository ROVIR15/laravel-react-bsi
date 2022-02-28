<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentReceipt extends Model
{
    protected $table = 'shipment_receipt';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'order_shipment_id'
    ];
}
