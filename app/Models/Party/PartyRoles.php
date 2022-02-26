<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class PartyRoles extends Model
{
    protected $table = 'party_roles';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'party_id',
        'relationship_id'
    ];
}
