<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $table = 'person';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id'
    ];
}
