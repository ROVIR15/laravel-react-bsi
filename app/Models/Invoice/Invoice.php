<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;
use DB;

class Invoice extends Model
{
    protected $table = 'invoice';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'invoice_date',
        'order_id',
        'shipment_id',
        'due_date',
        'sold_to',
        'tax',
        'description'
    ];

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'sold_to', 'id')->with('address');
    }

    public function payment_history(){
        return $this->hasManyThrough('App\Models\Invoice\Payment', 'App\Models\Invoice\PaymentHasInvoice', 'invoice_id', 'id', 'id', 'payment_id');
    }

    public function sales_order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id', 'id')->with('sales_order');
    }

    public function purchase_order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id', 'id')->with('purchase_order');
    }

    public function items(){
        return $this->hasMany('App\Models\Invoice\InvoiceItem', 'invoice_id')->with('order_item');
    }

    public function sum(){
        return $this->hasMany('App\Models\Invoice\InvoiceItem', 'invoice_id')->select('id', 'invoice_id', DB::raw('sum(qty) as total_qty, sum(amount*qty) as total_amount'))->groupBy('invoice_id');
    }

    public function status(){
        return $this->hasMany('App\Models\Invoice\InvoiceStatus', 'invoice_id', 'id')->with('type')->orderBy('created_at', 'desc');
    }

    public function terms(){
        return $this->hasMany('App\Models\Invoice\InvoiceTerm', 'invoice_id');
    }

    public function type(){
        return $this->belongsTo('App\Models\Invoice\InvoiceHasType', 'id', 'invoice_id');
    }

    public function submission(){
      return $this->hasMany('App\Models\Invoice\InvoiceSubmission')->with('user_info')->orderBy('created_at', 'desc');
    }
}
