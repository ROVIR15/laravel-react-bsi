<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductFeature extends Model
{
    protected $table = 'product_feature';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'product_id',
        'color',
        'size',
        'price_component_id'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product');
    }

    public function product_category(){
        return $this->hasOneThrough('App\Models\Product\ProductHasCategory', 'App\Models\Product\Product', 'id', 'product_id', 'product_id', 'id');
    }
}
