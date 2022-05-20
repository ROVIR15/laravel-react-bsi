<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class SalesInvoiceView extends Model
{
    //
    protected $table = 'sales_invoice_view';

    public function items(){
        return $this->hasMany('App\Models\Invoice\SalesInvoiceItemView', 'invoice_id')->with('product_feature');
    }

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'sold_to', 'id');
    }

    public function ship(){
        return $this->belongsTo('App\Models\Party\Party', 'ship_to', 'id');
    }
}
