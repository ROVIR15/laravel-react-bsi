<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    protected $table = 'invoice_item';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'invoice_id',
        'order_item_id',
        'qty',
        'amount'
    ];

    public function order_item(){
        return $this->belongsTo('App\Models\Order\OrderItem', 'order_item_id')->with('product_feature');
    }
}
