<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Goods extends Model
{
    protected $table = 'goods';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
