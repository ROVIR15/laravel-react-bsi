<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceType extends Model
{
    protected $table = 'invoice_type';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'name',
        'description'
    ];
}
