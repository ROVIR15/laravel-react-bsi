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
        'product_feature_id',
        'qty'
    ];

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature');
    }

}
