<?php

namespace App\Models\Agreement;

use Illuminate\Database\Eloquent\Model;

class AgreementRole extends Model
{
    protected $table = 'agreement_role';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'agreement_id'
    ];
}
