<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    //
    protected $table = 'payment';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'payment_method_type_id',
        'invoice_id',
        'effective_date',
        'ref_num',
        'amount',
        'comment',
        'imageUrl'
    ];

    public function type(){
        return $this->belongsTo('App\Models\Invoice\PaymentMethodType', 'payment_method_type_id');
    }

    public function sales_invoice(){
        return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id')->with('sales_order', 'party', 'sum', 'status', 'items');
    }

    public function invoice()
    {
        return $this->hasManyThrough('App\Models\Invoice\Invoice', 'App\Models\Invoice\PaymentHasInvoice', 'payment_id', 'id', 'id', 'invoice_id')->with('type', 'sales_order', 'purchase_order');
    }
}
