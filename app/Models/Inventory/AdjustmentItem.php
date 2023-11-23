<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class AdjustmentItem extends Model
{
    //
    protected $table = 'adjustment_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'adjustment_id',
        'product_id',
        'product_feature_id',
        'initial_qty',
        'changes',
        'import_flag'
    ];

    public function product()
    {
        return $this->belongsTo('App\Models\Product\Product')->with('goods');
    }

    public function product_feature()
    {
        return $this->belongsTo('App\Models\Product\ProductFeature');
    }
}
