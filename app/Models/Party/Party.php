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
        'person_party_id',
        'name',
        'email',
        'npwp',
        'organization_party_id',
        'agreement_role_id'
    ];

    public function person()
    {
      return $this->hasMany('App\Models\Party\Person');
    }

    public function organization()
    {
      return $this->hasMany('App\Models\Party\Organization');
    }

    public function party_roles()
    {
      return $this->hasMany('App\Models\Party\PartyRoles')->with('relationship');
    }

    public function address()
    {
      return $this->hasOne('App\Models\Party\Address');
    }

    public function relationship()
    {
      return $this->hasOneThrough('App\Models\Party\Relationship', 'App\Models\Party\PartyRoles');
    }
}
