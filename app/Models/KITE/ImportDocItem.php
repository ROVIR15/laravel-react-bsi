<?php

namespace App\Models\KITE;

use Illuminate\Database\Eloquent\Model;

class ImportDocItem extends Model
{
    protected $table = 'kite_import_item';
    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'kite_import_doc_id',
        'order_item_id',
        'product_id',
        'product_feature_id',
        'hs_code',
        'item_serial_number'
    ];

    public function order_item() {
        return $this->belongsTo('App\Models\Order\OrderItem', 'order_item_id');
    }

    public function product_feature() {
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id');
    }

    public function product() {
        return $this->belongsTo('App\Models\Product\Product', 'product_id');
    }

    public function doc() {
        return $this->belongsTo('App\Models\KITE\ImportDoc', 'kite_import_doc_id');
    }

    public function movement(){
        return $this->hasMany('App\Models\Inventory\GoodsMovement', 'order_item_id', 'order_item_id');
    }
}
