<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceHasType extends Model
{
    protected $table = 'invoice_has_invoice_type';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'invoice_id',
        'invoice_type_id'
    ];

    public function sales_invoice(){
        return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id', 'id')->with('sales_order', 'party', 'sum', 'status');
    }

    public function purchase_invoice(){
        return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id', 'id')->with('purchase_order', 'party', 'sum', 'status');
    }

    public function all_invoice_type(){
        return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id', 'id')->with('sales_order', 'purchase_order', 'party', 'sum', 'status', 'terms');
    }

    public function terms(){
        return $this->hasMany('App\Models\Invoice\InvoiceTerm', 'invoice_id', 'invoice_id');
    }

    public function payment_history(){
        return $this->hasManyThrough('App\Models\Invoice\Payment', 'App\Models\Invoice\PaymentHasInvoice', 'invoice_id', 'id', 'invoice_id', 'payment_id')->select('id', 'payment_method_type_id', 'effective_date', 'ref_num', 'amount');
    }

}
