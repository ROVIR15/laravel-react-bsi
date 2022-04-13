<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $table = 'quote';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'quote_type',
        'request_id',
        'party_id',
        'ship_to',
        'po_number',
        'delivery_date',
        'issue_date',
        'valid_thru'
    ];

    public function quote_item(){
        return $this->hasMany('App\Models\RRQ\QuoteItem');
    }
}
