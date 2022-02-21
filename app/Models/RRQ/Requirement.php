<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class Requirement extends Model
{
    protected $table = 'factory';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
