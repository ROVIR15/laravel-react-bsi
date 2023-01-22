<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceTerm extends Model
{
    protected $table = 'invoice_term';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'invoice_id',
        'invoice_item_id',
        'term_description',
        'term_value',
        'value_type'
    ];
}
