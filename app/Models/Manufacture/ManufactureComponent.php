<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class ManufactureComponent extends Model
{
    //
    protected $table = 'manufacture_component';

    protected $primaryKey = 'id';
    public $timestamp = true;
    public $incrementing = true;

    protected $fillable = [
        'manufacture_id',
        'product_feature_id',
        'qty_to_be_consumed',
    ];

    public function inventory_item(){
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id', 'id')->with('product');
    }
}
