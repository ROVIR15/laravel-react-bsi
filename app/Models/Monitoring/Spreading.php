<?php

namespace App\Models\Monitoring;

use Illuminate\Database\Eloquent\Model;

class Spreading extends Model
{
    protected $table = 'monitoring_bsi_spreading';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'date',
        'po_number',
        'sales_order_id',
        'order_id',
        'product_feature_id',
        'ratio',
        'marker_length',
        'fabric_length',
        'fabric_width',
        'actual_spread_length',
        'lot'
    ];

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }

    public function sales_order(){
        return $this->belongsTo('App\Models\Order\SalesOrder');
    }
}
