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
        return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id', 'id')->with('sales_order', 'party', 'sum');
    }

    public function purchase_invoice(){
        return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id', 'id')->with('purchase_order', 'party', 'sum');
    }

}
