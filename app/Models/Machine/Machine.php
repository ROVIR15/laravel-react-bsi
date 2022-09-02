<?php

namespace App\Models\Machine;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    protected $table = 'machine';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'product_id',
        'type',
        'code',
        'serial_number'
    ];

    public function product(){
        return $this->belongsTo('App\Models\Product\Product', 'id', 'goods_id')->with('productCategory');
    }
}
