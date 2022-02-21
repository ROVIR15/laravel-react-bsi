<?php

namespace App\Models\Agreement;

use Illuminate\Database\Eloquent\Model;

class AgreementItem extends Model
{
    protected $table = 'agreement_item';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'agreement_id'
    ];
}
