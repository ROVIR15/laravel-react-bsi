<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'order';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id'
    ];
}
