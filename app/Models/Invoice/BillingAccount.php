<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class BillingAccount extends Model
{
    protected $table = 'billing_account';

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
