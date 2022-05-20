<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class PurchaseInvoiceItemView extends Model
{
    protected $table = 'purchase_invoice_item_view';

    public function product_feature(){
        return $this->belongsTo('App\Models\Product\ProductFeature')->with('product');
    }
}
