<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class InvoiceReceipt extends Model
{
    protected $table = 'invoice_receipt';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'purchase_order_id',
        'amount',
        'qty',
        'invoice_date',
        'posting_date',
    ];
}
