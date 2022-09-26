<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'service';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'name'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product', 'id', 'service_id')->with('productCategory');
    }

    // public function ProductFeature(){
    //     return $this->belongsTo()
    // }
}
