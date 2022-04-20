<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class GoodsReceiptItems extends Model
{
    protected $table = 'goods_receipt_items';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'goods_receipt_id',
        'order_item_id',
        'order_item_order_id',
        'qty_received',
        'qty_on_receipt'
    ];
}
