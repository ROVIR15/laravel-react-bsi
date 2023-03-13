<?php

namespace App\Models\Reconcile;

use Illuminate\Database\Eloquent\Model;

class Reconcile extends Model
{
    //
    protected $table = 'reconcile';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'costing_id',
        'sales_order_id',
        'order_id'
    ];

    public function order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id', 'id')->with('sales_order', 'info', 'order_item');
    }

    public function po(){
        return $this->hasMany('App\Models\Reconcile\ReconcileHasPurchaseOrder', 'reconcile_id', 'id')->with('order', 'detail');
    }

    public function costing(){
        return $this->belongsTo('App\Models\Manufacture\BOM', 'costing_id', 'id')->with('bom_items', 'bom_services')->with(['operation' => function($query) { return $query->with('work_center'); }]);
    }

    public function costing2(){
        return $this->belongsTo('App\Models\Manufacture\BOM', 'costing_id', 'id');
    }

    public function invoice(){
        return $this->belongsTo('App\Models\Invoice\Invoice', 'order_id', 'order_id')->with('sum');
    }

    public function shipment()
    {
        return $this->belongsTo('App\Models\Shipment\Shipment', 'order_id', 'order_id')->with('sum');
    }

    public function so()
    {
        return $this->hasMany('App\Models\Reconcile\ReconcileHasSalesOrder', 'reconcile_id', 'id')->with('order', 'detail', 'invoice');
    }

    public function alt_costing()
    {
        return $this->hasMany('App\Models\Reconcile\ReconcileHasCosting', 'reconcile_id', 'id')->with('costing');
    }
}
