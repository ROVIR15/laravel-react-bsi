<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class RequestItem extends Model
{
    protected $table = 'factory';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'request_id'
    ];
}
