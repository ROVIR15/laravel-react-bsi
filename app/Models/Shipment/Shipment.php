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
        'comment',
        'serial_number',
        'shipment_type_id',
        'delivery_date',
        'est_delivery_date',
        'order_id',
        'imageUrl'
    ];

    public function items(){
        return $this->hasMany('App\Models\Shipment\ShipmentItem')->with('order_item');
    }

    public function order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id')->with('sales_order', 'purchase_order');
    }

    public function type(){
        return $this->belongsTo('App\Models\Shipment\ShipmentType', 'shipment_type_id');
    }

    public function status(){
        return $this->hasMany('App\Models\Shipment\ShipmentStatus', 'shipment_id', 'id')
        ->with('status_type')
        ->orderBy('created_at', 'desc');
    }

    public function hasInvoice(){
        return $this->belongsTo('App\Modes\Invoice\InvoiceHasShipment', 'id');
    }
}
