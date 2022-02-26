<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $table = 'order';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id'
    ];
}
