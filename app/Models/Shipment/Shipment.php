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
        'order_id'
    ];

    public function item(){
        return $this->hasMany('App\Models\Shipment\ShipmentItem');
    }

    public function buyer(){
        return $this->belongsTo('App\Models\Party\Party', 'sold_to', 'id');
    }

    public function ship(){
        return $this->belongsTo('App\Models\Party\Party', 'ship_to', 'id');
    }

}
