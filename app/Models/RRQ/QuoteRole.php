<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class QuoteRole extends Model
{
    protected $table = 'quote_role';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'quote_id'
    ];
}
