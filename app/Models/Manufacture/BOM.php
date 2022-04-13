<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class BOM extends Model
{
    protected $table = 'bom';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'product_id',
        'product_feature_id',
        'name',
        'qty',
        'start_date',
        'end_date',
        'company_name'
    ];

    public function bom_items(){
        return $this->hasMany('App\Models\Manufacture\BOMItem', 'bom_id');
    }

    public function product_info(){
        return $this->hasManyThrough('App\Models\Product\ProductFeature', 'App\Models\Manufacture\BOMItem', 'bom_id', 'id', 'id', 'id');
    }

    public function operation(){
        return $this->hasMany('App\Models\Manufacture\Operation', 'bom_id');
    }
}
