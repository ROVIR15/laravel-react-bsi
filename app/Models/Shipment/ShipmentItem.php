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
        'product_feature_id',
        'qty_shipped'
    ];
}
