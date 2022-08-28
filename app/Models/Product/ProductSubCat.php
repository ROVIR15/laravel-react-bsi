<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductSubCat extends Model
{
    protected $table = 'product_sub_category';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;
}
