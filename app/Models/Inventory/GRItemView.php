<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class GRItemView extends Model
{
    protected $table = 'goods_receipt_items_view';

    public function product_info(){
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id', 'id');
    }
}
