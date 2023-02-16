<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $table = 'product_category';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    public function sub(){
        return $this->belongsTo('App\Models\Product\ProductSubCat', 'sub_cat', 'id');
    }
}
