<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentTypeStatus extends Model
{
    protected $table = 'shipment_type_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'description',
        'name'
    ];
}
