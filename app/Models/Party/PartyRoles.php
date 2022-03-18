<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

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

    public function relationship()
    {
      return $this->belongsTo('App\Models\Party\Relationship');
    }

    public function party()
    {
      return $this->hasOneThrough('App\Models\Party\Party', 'App\Models\Party\Address');
    }
}
