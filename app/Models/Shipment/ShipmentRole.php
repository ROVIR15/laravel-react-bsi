<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentRole extends Model
{
    protected $table = 'shipment_role';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'shipment_receipt_id'
    ];
}
