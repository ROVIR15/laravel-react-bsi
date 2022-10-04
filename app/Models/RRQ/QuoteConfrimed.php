<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class QuoteConfrimed extends Model
{
    protected $table = 'quote_confirmed';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = true;

    protected $fillable = [
        'id',
        'order_id',
        'total_qty',
        'amount_of_money'
    ];

    public function quote() {
        return $this->belongsTo('App\Models\RRQ\Quote', 'quote_id');
    }

}
