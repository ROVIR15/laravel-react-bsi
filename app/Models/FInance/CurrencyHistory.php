<?php

namespace App\Models\FInance;

use Illuminate\Database\Eloquent\Model;

class CurrencyHistory extends Model
{
    //
    protected $table = 'currency_history';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'idr'
    ];
}
