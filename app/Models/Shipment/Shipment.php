<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    protected $table = 'shipment';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'delivery_date',
        'total_weight'
    ];

    public function item(){
        return $this->hasMany('App\Models\Shipment\ShipmentItem');
    }
}
