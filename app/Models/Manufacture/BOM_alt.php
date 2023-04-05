<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class BOM_alt extends Model
{
    //
    protected $table = 'bom_alt';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'product_feature_id'
    ];

    public function product_feature()
    {
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id', 'id')->with('product', 'product_category');
    }

    public function items(){
        return $this->hasMany('App\Models\Manufacture\BOMItem_alt', 'bom_id', 'id')->with('product_feature');
    }
}
