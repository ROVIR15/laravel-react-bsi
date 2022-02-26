<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Relationship extends Model
{
    protected $table = 'relationship';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'status_id'
    ];
}
