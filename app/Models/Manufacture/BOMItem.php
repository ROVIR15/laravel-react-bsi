<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class BOMItem extends Model
{
    protected $table = 'bom_component';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'bom_id',
        'product_id',
        'product_feature_id',
        'qty',
        'consumption',
        'allowance',
        'scrap_conversion',
        'unit_price'
    ];

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product', 'product_category');
    }

    public function order_item(){
        return $this->belongsTo('App\Models\Order\OrderItem', 'id', 'costing_item_id');
    }

    public function costing(){
        return $this->belongsTo('App\Models\Manufacture\BOM', 'bom_id');
    }

    public function import_item(){
        return $this->hasMany('App\Models\KITE\ImportDocItem', 'product_feature_id', 'product_feature_id')->with('movement');
    }
}
