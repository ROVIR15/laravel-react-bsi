<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class BOMItem_alt extends Model
{
    protected $table = 'bom_item_alt';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'bom_id',
        'product_feature_id',
        'consumption',
        'allowance',
        'unit_price'
    ];

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product', 'product_category');
    }
}
