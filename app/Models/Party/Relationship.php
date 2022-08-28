<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    protected $table = 'relationship';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'status_id'
    ];

    public function status()
    {
      return $this->hasOne('App\Models\Party\Status');
    }

    public function party_roles()
    {
      return $this->hasMany('App\Models\Party\PartyRoles');
    }

    public function party()
    {
      return $this->hasManyThrough('App\Models\Party\PartyRoles', 'App\Models\Party\Party');
    }
}
