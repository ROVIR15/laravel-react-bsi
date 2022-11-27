<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $table = 'invoice';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'invoice_date',
        'order_id',
        'sold_to',
        'tax',
        'description'
    ];

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'sold_to', 'id')->with('address');
    }

    public function sales_order(){
        return $this->belongsTo('App\Models\Order\Order', 'order_id', 'id')->with('sales_order');
    }

    public function purchase_order(){
        return $this->belongsTo('App\Models\Order\Order')->with('purchase_order');
    }

    public function items(){
        return $this->hasMany('App\Models\Invoice\InvoiceItem', 'invoice_id')->with('order_item');
    }
}
