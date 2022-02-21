<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class QuoteItem extends Model
{
    protected $table = 'quote_item';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'quote_id',
        'order_item_id',
        'order_item_order_id',
        'request_item_id',
        'qty'
    ];
}
