<?php

namespace App\Models\Monitoring;

use Illuminate\Database\Eloquent\Model;
use DB;

class Cutting extends Model
{
    protected $table = 'monitoring_bsi_cutting';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'spread_id',
        'date',
        'po_number',
        'sales_order_id',
        'order_id',
        'order_item_id',
        'product_feature_id',
        'category_name',
        'output'
    ];

    public function gmovement(){
        return $this->hasMany('App\Models\Inventory\GoodsMovement', 'order_item_id', 'order_item_id');
    }

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
        return $this->hasMany('App\Models\Monitoring\Sewing', 'product_feature_id', 'product_feature_id')->select('id', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output'))->groupBy('order_item_id');
    }

    public function supermarket(){
        return $this->hasMany('App\Models\Monitoring\Supermarket', 'product_feature_id', 'product_feature_id')->select('id', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(qty) as total_output'))->with('order_item')->groupBy('order_item_id');
    }

    public function wip_sewing(){
        return $this->hasMany('App\Models\Monitoring\Sewing', 'order_item_id', 'order_item_id')->select('id', 'order_id', 'order_item_id', 'product_feature_id', DB::raw('sum(output) as total_output'))->groupBy('order_item_id', 'date');
    }

}
