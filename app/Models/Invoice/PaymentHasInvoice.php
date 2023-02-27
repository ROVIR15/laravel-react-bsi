<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class PaymentHasInvoice extends Model
{
    //
    protected $table = 'payment_has_invoice';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'payment_id',
        'invoice_id'
    ];

    public function payment()
    {
        return $this->belongsTo('App\Models\Invoice\Payment', 'payment_id');
    }

    public function invoice()
    {
        return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id');
    }
}
