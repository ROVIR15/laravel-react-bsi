<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class QuoteItem extends Model
{
protected $table = 'quote_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = true;

    protected $fillable = [
        'id',
        'quote_id',
        'request_item_id',
        'product_id',
        'product_feature_id',
        'costing_item_id',
        'unit_price',
        'qty'
    ];

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }
}
