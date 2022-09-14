<?php

namespace App\Models\Agreement;

use Illuminate\Database\Eloquent\Model;

class AgreementItem extends Model
{
    protected $table = 'agreement_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'agreement_id',
        'product_feature_id',
        'product_id',
        'qty',
        'price'
    ];
}
