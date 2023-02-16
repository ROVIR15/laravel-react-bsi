<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentItem extends Model
{
    protected $table = 'shipment_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;
    
    protected $fillable = [
        'id',
        'shipment_id',
        'order_item_id',
        'qty_shipped',
        'description'
    ];

    public function order_item(){
      return $this->belongsTo('App\Models\Order\OrderItem', 'order_item_id')->with('product_feature');
    }
}
