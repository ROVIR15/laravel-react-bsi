<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class RequestItem extends Model
{
    protected $table = 'request_item';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamp = false;

    protected $fillable = [
        'id',
        'request_id',
        'product_feature_id',
        'qty'
    ];
    
    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }
}
