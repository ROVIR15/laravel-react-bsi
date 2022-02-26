<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'address';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'party_id',
    ];
}
