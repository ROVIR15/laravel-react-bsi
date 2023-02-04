<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;
use DB;

class Quote extends Model
{
    protected $table = 'quote';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'currency_id',
        'quote_type',
        'request_id',
        'party_id',
        'ship_to',
        'po_number',
        'delivery_date',
        'issue_date',
        'valid_thru',
        'tax'
    ];

    public function quote_item(){
        return $this->hasMany('App\Models\RRQ\QuoteItem');
    }

    public function sum(){
        return $this->hasMany('App\Models\RRQ\QuoteItem')->groupBy('quote_id')->select('quote_id',DB::raw('sum(qty) as total_qty, sum(qty*unit_price) as total_money'));
    }

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'party_id', 'id');
    }

    public function ship(){
        return $this->belongsTo('App\Models\Party\Party', 'ship_to', 'id');
    }

    public function status(){
        return $this->hasMany('App\Models\RRQ\QuoteStatus')->orderBy('created_at', 'desc');
    }

    public function confirmation(){
        return $this->belongsTo('App\Models\RRQ\Quote','quote_id');
    }
}
