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
        'name',
        'part_id',
    ];

    public function goods(){
        return $this->belongsTo('App\Models\Product\Goods');
    }

    public function productCategory(){
        return $this->hasOne('App\Models\Product\ProductHasCategory')->with('category');
    }
}
