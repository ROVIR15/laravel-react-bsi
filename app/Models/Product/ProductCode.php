<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductCode extends Model
{
    //
    protected $table = 'product_code';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;
}
