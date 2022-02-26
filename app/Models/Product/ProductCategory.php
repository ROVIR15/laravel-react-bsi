<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'order';

    protected $primaryKey = 'product_category';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];
}
