<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductHasCategory extends Model
{
    protected $table = 'product_has_category';

    protected $primaryKey = '';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'product_category_id',
        'product_sub_category_id'
    ];

    public function category(){
        return $this->belongsTo('App\Models\Product\ProductCategory', 'product_category_id')->with('sub');
    }

    public function product(){
        return $this->belongsTo('App\Models\Product\Product', 'product_id')->with('goods');
    }

    public function service(){
        return $this->belongsTo('App\Models\Product\Product', 'product_id')->with('service');
    }
}
