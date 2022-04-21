<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentReceipt extends Model
{
    protected $table = 'shipment_receipt';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'shipment_item_id',
        'qty_accepted'
    ];
}
