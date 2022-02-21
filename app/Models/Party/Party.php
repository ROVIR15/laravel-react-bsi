<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    protected $table = 'party';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'party_type',
        'agreement_role_id'
    ];
}
