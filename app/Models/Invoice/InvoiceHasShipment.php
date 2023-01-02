<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceHasShipment extends Model
{
    protected $table = 'invoice_has_shipment';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'invoice_id',
        'shipment_id'
    ];
}
