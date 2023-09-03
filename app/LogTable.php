<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LogTable extends Model
{
    protected $table = 'logs';

    protected $fillable = [
        'level',
        'url',
        'method',
        'message',
        'context',
        'user_id',
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }

    // Define relationships, methods, or other model logic here
}
