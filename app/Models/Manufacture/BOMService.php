<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class BOMService extends Model
{
    protected $table = 'bom_service';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'bom_id',
        'product_id',
        'unit_price'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product')->with('service');
    }

}
