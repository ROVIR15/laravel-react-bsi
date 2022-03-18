<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Goods extends Model
{
    protected $table = 'goods';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'satuan',
        'value',
        'brand'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product');
    }

    public function productHasCategory(){
        return $this->hasOneThrough('App\Models\Product\Product', 'App\Models\Product\ProductHasCategory');
    }

    // public function ProductFeature(){
    //     return $this->belongsTo()
    // }
}
