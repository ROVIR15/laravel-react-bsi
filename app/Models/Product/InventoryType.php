<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class InventoryType extends Model
{
    protected $table = 'inventory_type';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
