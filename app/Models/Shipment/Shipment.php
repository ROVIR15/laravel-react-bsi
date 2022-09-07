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

    public function items(){
        return $this->hasMany('App\Models\Shipment\ShipmentItem')->with('order_item');
    }

    public function order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id')->with('sales_order');
    }
}
