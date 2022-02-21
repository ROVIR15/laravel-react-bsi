<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'product_type_id',
        'name',
        'part_id'
    ];
}
