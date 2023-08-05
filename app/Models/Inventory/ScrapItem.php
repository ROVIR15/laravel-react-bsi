<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class ScrapItem extends Model
{
    protected $table = 'scrap_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'product_id',
        'product_feature_id',
        'order_id',
        'order_item_id',
        'qty',
        'from_facility_id',
        'to_facility_id'
    ];

    public function product_feature() {
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id');
    }

    public function product() {
        return $this->belongsTo('App\Models\Product\Product', 'product_id')->with('productCategory', 'goods');
    }
}
