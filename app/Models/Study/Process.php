<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    protected $table = 'process';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description'
    ];

}
