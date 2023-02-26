<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceSubmission extends Model
{
    protected $table = 'invoice_submission';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'description',
        'status_type',
        'user_id',
        'invoice_id',
        'id'
    ];

    public function sales_invoice() {
      return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id')->with('items', 'sales_order');
    }

    public function purchase_invoice() {
      return $this->belongsTo('App\Models\Invoice\Invoice', 'invoice_id')->with('items', 'purchase_order');
    }

    public function user_info(){
      return $this->belongsTo('App\User', 'user_id');
    }
}
