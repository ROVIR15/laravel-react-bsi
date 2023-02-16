<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class TrxType extends Model
{
    //
    protected $table = 'trx_type';

    protected $primaryKey = 'id';
    
    public $incrementing = false;
    public $timestamps= false;

    protected $fillable = [
        'name'
    ];
}
