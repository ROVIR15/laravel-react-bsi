<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class QuoteItem extends Model
{
    protected $table = 'quote_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = false;

    protected $fillable = [
        'id',
        'quote_id',
        'request_item_id',
        'product_feature_id',
        'unit_price',
        'qty',
        'created_at'
    ];

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }
}
