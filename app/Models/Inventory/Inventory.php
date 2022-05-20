<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    //
    protected $table = 'inventory_item';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'facility_id',
        'product_feature_id',
        'qty_on_hand'
    ];
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
