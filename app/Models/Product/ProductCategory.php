<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'order';

    protected $primaryKey = 'product_category';

    public $incrementing = true;

    protected $fillable = [
        'order_type_id',
        'creation_time',
        'update_time'
    ];
}
