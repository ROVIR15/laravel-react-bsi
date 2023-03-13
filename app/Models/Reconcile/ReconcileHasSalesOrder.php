<?php

namespace App\Models\Reconcile;

use Illuminate\Database\Eloquent\Model;

class ReconcileHasSalesOrder extends Model
{
    protected $table = 'reconcile_has_sales_order';

    protected $primaryKey = 'id';
    
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'reconcile_id',
        'order_id',
        'sales_order_id'
    ];

    public function order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id', 'id')->with('info');
    }

    public function detail(){
        return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id', 'id');
    }

    public function invoice(){
        return $this->hasMany('App\Models\Invoice\Invoice', 'order_id', 'order_id')->with('sum');
    }
}
