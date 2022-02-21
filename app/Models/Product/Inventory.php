<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    protected $table = 'inventory';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
