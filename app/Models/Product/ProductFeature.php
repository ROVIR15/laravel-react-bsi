<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductFeature extends Model
{
    protected $table = 'product_feature';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'product_id',
        'color',
        'size',
        'brand',
        'price_component_id'
    ];
}
