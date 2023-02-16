<?php

namespace App\Models\Reconcile;

use Illuminate\Database\Eloquent\Model;

class ReconcileHasPurchaseOrder extends Model
{
    //
    protected $table = 'reconcile_has_purchase_order';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'reconcile_id',
        'purchase_order_id',
        'order_id'
    ];

    public function order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id', 'id')->with('info');
    }

    public function detail(){
        return $this->belongsTo('App\Models\Order\PurchaseOrder', 'purchase_order_id', 'id');
    }

}
