<?php

namespace App\Models\Monitoring;

use Illuminate\Database\Eloquent\Model;

class Supermarket extends Model
{
    protected $table = 'monitoring_bsi_supermarket';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'numbering_id',
        'date',
        'po_number',
        'sales_order_id',
        'order_id',
        'order_item_id',
        'product_feature_id',
        'qty',
        'numbering'
    ];

    public function order_item(){
        return $this->belongsTo('App\Models\Order\OrderItem')->with('product_feature');
    }

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }

    public function sales_order(){
        return $this->belongsTo('App\Models\Order\SalesOrder')->with('product_feature');
    }

    public function sewing(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'supermarket_id', 'id')->selectRaw('sum(output) as output_sewing, supermarket_id')->groupBy('supermarket_id');
    }
}
