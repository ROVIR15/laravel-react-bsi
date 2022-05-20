<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class InventoryGoodsMovement extends Model
{
    //
    protected $table = 'inventory_goods_movement';

    protected $timestamp = true;
    protected $increment = true;

    protected $fillable = [
        'id',
        'product_feature_id',
        'movement_name',
        'ref_number',
        'qty'
    ];
}
