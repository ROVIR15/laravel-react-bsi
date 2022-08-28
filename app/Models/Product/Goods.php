<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Goods extends Model
{
    protected $table = 'goods';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'name',
        'satuan',
        'value',
        'brand',
        'imageUrl'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product', 'id', 'goods_id')->with('productCategory');
    }

    // public function ProductFeature(){
    //     return $this->belongsTo()
    // }
}
