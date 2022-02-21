<?php

namespace App\Models\Agreement;

use Illuminate\Database\Eloquent\Model;

class Agreement extends Model
{
    protected $table = 'factory';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
