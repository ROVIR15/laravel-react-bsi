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
        'issue_date',
        'valid_thru',
        'valid_from'
    ];

    public function quote_item(){
        return $this->hasMany('App\Models\RRQ\QuoteItem');
    }
}
