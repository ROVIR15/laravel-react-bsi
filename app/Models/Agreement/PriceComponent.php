<?php

namespace App\Models\Agreement;

use Illuminate\Database\Eloquent\Model;

class PriceComponent extends Model
{
    protected $table = 'price_component';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'agreement_item_id'
    ];
}
