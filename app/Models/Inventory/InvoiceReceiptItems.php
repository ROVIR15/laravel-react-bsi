<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class InvoiceReceiptItems extends Model
{
    protected $table = 'invoice_receipt';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'invoice_receipt_id',
        'order_item_id',
        'order_item_order_id',
        'amount',
        'qty'
    ];
}
