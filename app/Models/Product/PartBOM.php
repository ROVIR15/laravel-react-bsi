<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class PartBOM extends Model
{
    protected $table = 'part_bom';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'product_id',
        'qty_used',
        'description'
    ];
}
