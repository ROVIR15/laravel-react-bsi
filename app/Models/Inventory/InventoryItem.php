<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    //
    protected $table = 'inventory_item_view';

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id', 'id');
    }

    public function type(){
        return $this->belongsTo('App\Models\Inventory\InventorItemType', 'inventory_type_id', 'id');
    }

    public function facility(){
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id', 'id')->with('type');
    }
}
