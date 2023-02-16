<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ShipmentStatus extends Model
{
    protected $table = 'shipment_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'shipment_type_status_id',
        'shipment_id',
        'user_id'
    ];

    public function status_type(){
        return $this->belongsTo('App\Models\Shipment\ShipmentTypeStatus', 'shipment_type_status_id');
    }

    public function shipment(){
        return $this->belongsTo('App\Models\Shipment\Shipment', 'shipment_id');
    }
}
