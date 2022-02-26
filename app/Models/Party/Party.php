<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    protected $table = 'party';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;
    
    protected $fillable = [
        'id',
        'person_id',
        'organisation_id',
        'agreement_role_id'
    ];
}
