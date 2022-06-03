<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentView extends Model
{
    //
    protected $table = 'shipment_view';

    public function item(){
        return $this->hasMany('App\Models\Shipment\ShipmentItem', 'shipment_id', 'id')->with('order_item');
    }

    public function buyer(){
        return $this->belongsTo('App\Models\Party\Party', 'sold_to', 'id');
    }

    public function ship(){
        return $this->belongsTo('App\Models\Party\Party', 'ship_to', 'id');
    }

    public function sales_info(){
        return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id', 'id');
    }

    public function issued_goods(){
        return $this->hasMany('App\Models\Shipment\ItemIssuance', 'shipment_id', 'id');
    }

}
