<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

use function PHPSTORM_META\map;

class GoodsMovement extends Model
{
    protected $table = 'goods_movement';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'date',
        'import_flag',
        'material_transfer_id',
        'material_transfer_item_id',
        'material_transfer_item_realisation_id',
        'product_id',
        'product_feature_id',
        'goods_id',
        'facility_id',
        'type_movement',
        'order_item_id',
        'qty'
    ];

    public function product()
    {
        return $this->belongsTo('App\Models\Product\Product', 'product_id', 'id');
    }

    public function product_feature()
    {
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id', 'id');
    }

    public function goods()
    {
        return $this->belongsTo('App\Models\Product\Goods', 'goods_id', 'id')->with('product_code_');
    }

    public function product_category()
    {
        return $this->hasOneThrough('App\Models\Product\ProductHasCategory', 'App\Models\Product\Product', 'id', 'product_id', 'product_id', 'id')->with('category');
    }

    public function facility(){
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id', 'id')->with('type');
    }

    public function material_transfer(){
        return $this->belongsTo('App\Models\Inventory\MaterialTransfer', 'material_transfer_id', 'id');
    }

    public function relations_with_shipment(){
        return $this->belongsTo('App\Models\Inventory\MaterialTransferShipmentRelationship', 'material_transfer_id', 'material_transfer_id');
    }
}
