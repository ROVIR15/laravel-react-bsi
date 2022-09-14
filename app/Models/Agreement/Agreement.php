<?php

namespace App\Models\Agreement;

use Illuminate\Database\Eloquent\Model;

class Agreement extends Model
{
    protected $table = 'agreement';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = true;

    protected $fillable = [
        'id',
        'agreement_type_id',
        'type_id'
    ];
}
