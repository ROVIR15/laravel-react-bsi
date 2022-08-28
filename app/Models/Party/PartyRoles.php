<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PartyRoles extends Model
{
    protected $table = 'party_roles';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'party_id',
        'role_type_id',
        'relationship_id'
    ];

    public function relationship()
    {
      return $this->belongsTo('App\Models\Party\Relationship');
    }

    public function role_type()
    {
      return $this->belongsTo('App\Models\Party\RoleType');
    }

    public function party()
    {
      return $this->belongsTo('App\Models\Party\Party')->with('person', 'organization','address');
    }
}
