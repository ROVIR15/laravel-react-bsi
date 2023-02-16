<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceStatusType extends Model
{
    //
    protected $table = 'invoice_status_type';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'name'
    ];
}
