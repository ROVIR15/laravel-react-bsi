<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ScrapHasProductFeature extends Model
{
    //
    protected $table = 'scrap_has_product_feature';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'ori_product_id',
        'ori_product_feature_id',
        'scrap_product_id',
        'scrap_product_feature_id'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product', 'ori_product_id')->with('goods');
    }

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature', 'ori_product_feature_id');
    }

    public function scrap_product(){
        return $this->belongsTo('App\Models\Product\Product', 'scrap_product_id')->with('goods');
    }

    public function scrap_product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature', 'scrap_product_feature_id');
    }

}
