<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'service_id',
        'goods_id',
        'part_id',
    ];

    public function goods(){
        return $this->belongsTo('App\Models\Product\Goods')->with('product_code_');
    }

    public function service(){
        return $this->belongsTo('App\Models\Product\Service');
    }

    public function productCategory(){
        return $this->hasOne('App\Models\Product\ProductHasCategory')->with('category');
    }

    public function check_finished_goods(){
        return $this->hasManyThrough('App\Models\Monitoring\FinishedGoods', 'App\Models\Product\ProductFeature', 'product_id', 'product_feature_id', 'id');
    }

    public function check_shipment()
    {
        return $this->hasManyThrough('App\Models\Order\OrderItem', 'App\Models\Product\ProductFeature', 'id', 'product_feature_id', 'id');
    }
}
