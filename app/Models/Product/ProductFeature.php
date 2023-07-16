<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;
use DB;

class ProductFeature extends Model
{
    protected $table = 'product_feature';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'product_id',
        'color',
        'size',
        'price_component_id'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product')->with('goods', 'service');
    }

    public function product_category(){
        return $this->hasOneThrough('App\Models\Product\ProductHasCategory', 'App\Models\Product\Product', 'id', 'product_id', 'product_id', 'id')->with('category');
    }

    public function inventory(){
        return $this->belongsTo('App\Models\Inventory\InventoryItem', 'id', 'product_feature_id')->with('facility');
    }

    public function in(){
        return $this->hasManyThrough('App\Models\Shipment\ShipmentItem', 'App\Models\Order\OrderItem', 'product_feature_id', 'order_item_id', 'id')
                    ->whereHas('shipment', function ($query){
                        return $query->where('shipment_type_id', 1);
                    })
                    ->select('order_item_id', 'shipment_id', DB::raw('sum(qty_shipped) as qty'))
                    ->groupBy('laravel_through_key');
    }

    public function out(){
        return $this->hasManyThrough('App\Models\Shipment\ShipmentItem', 'App\Models\Order\OrderItem', 'product_feature_id', 'order_item_id', 'id')
                    ->whereHas('shipment', function ($query){
                        return $query->where('shipment_type_id', 2);
                    })
                    ->select('order_item_id', 'shipment_id', DB::raw('sum(qty_shipped) as qty'))
                    ->groupBy('laravel_through_key');
    }

    public function finished_goods(){
        return $this->hasMany('App\Models\Monitoring\FinishedGoods', 'product_feature_id')->select('id', 'product_feature_id', DB::raw('sum(output) as output'))->groupBy('product_feature_id');
    }

    public function movement(){
        return $this->hasMany('App\Models\Inventory\GoodsMovement', 'product_feature_id');
                    // ->select('id', 'date', 'product_id', 'product_feature_id', 'material_transfer_id', 'material_transfer_item_id', 'material_transfer_item_realisation_id', 'goods_id', DB::raw('SUM(qty) as req_transfer'));
    }

    public function last_movement(){
        return $this->hasMany('App\Models\Inventory\GoodsMovement', 'product_feature_id');
                    // ->select('id', 'date', 'product_id', 'product_feature_id', 'material_transfer_id', 'material_transfer_item_id', 'material_transfer_item_realisation_id', 'goods_id', DB::raw('SUM(qty) as req_transfer'));
    }
}
