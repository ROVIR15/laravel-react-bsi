<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class SalesInvoiceItemView extends Model
{
    protected $table = 'sales_invoice_item_view';

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }

    public function invoice(){
        return $this->belongsTo('App\Models\Invoice\SalesInvoiceItemView', 'invoice_id', 'invoice_id');
    }
}
