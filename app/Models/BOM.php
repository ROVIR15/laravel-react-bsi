<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BOM extends Model
{
    protected $table = 'bom';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'name',
        'qty',
        'company_name'
    ];

    public function bom_items(){
        return $this->hasMany('App\Models\Manufacture\BOMItems');
    }

    public function product_info(){
        return $this->hasManyThrough('App\Models\Product\ProductFeature', 'App\Models\Manufacture\BOMItem', 'bom_id', 'id', 'id', 'id');
    }
}
