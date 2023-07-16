<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class MaterialTransferItem extends Model
{
    protected $table = 'material_transfer_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'material_transfer_id',
        'goods_id',
        'product_id',
        'product_feature_id',
        'transfer_qty'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product', 'product_id')->with('goods');
    }

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id')->with('product_category');
    }

    public function transferred(){
        return $this->hasMany('App\Models\Inventory\MaterialTransferRealisation', 'material_transfer_item_id');
    }

    public function doc(){
        return $this->belongsTo('App\Models\Inventory\MaterialTransfer', 'material_transfer_id');
    }
}
