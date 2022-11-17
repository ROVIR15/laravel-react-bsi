<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductInformationView extends Model
{
    protected $table = 'product_information_view';

    protected $primaryKey = 'id';

    public function goods(){
        return $this->belongsTo('App\Models\Product\Goods');
    }
}
