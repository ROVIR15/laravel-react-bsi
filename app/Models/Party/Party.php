<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Party extends Model
{
    protected $table = 'party';

    protected $primaryKey = 'id';

    public $incrementing = true;
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
      return $this->belongsTo('App\Models\Party\Person','person_party_id');
    }

    public function organization()
    {
      return $this->hasMany('App\Models\Party\Organization', 'id', 'organization_party_id');
    }

    public function party_roles()
    {
      return $this->hasMany('App\Models\Party\PartyRoles')->with('relationship', 'role_type');
    }

    public function address()
    {
      return $this->hasOne('App\Models\Party\Address');
    }

    public function relationship()
    {
      return $this->hasOneThrough('App\Models\Party\Relationship', 'App\Models\Party\PartyRoles');
    }

    public function sales_order()
    { 
      return $this->hasMany('App\Models\Order\SalesOrder', 'sold_to', 'id');
    }
}
