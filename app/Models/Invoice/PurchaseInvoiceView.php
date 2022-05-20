<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class PurchaseInvoiceView extends Model
{
    protected $table = 'purchase_invoice_view';

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'bought_from', 'id');
    }

    public function items(){
        return $this->hasMany('App\Models\Invoice\PurchaseInvoiceItemView', 'invoice_id')->with('product_feature');
    }
}
