<?php

namespace App\Models\KITE;

use Illuminate\Database\Eloquent\Model;

class ExportDocItem extends Model
{
    protected $table = 'export_kite_item';
    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'export_doc_id',
        'order_item_id',
        'product_id',
        'product_feature_id',
        'qty'
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
        return $this->belongsTo('App\Models\KITE\ExportDoc', 'export_doc_id');
    }
}
