<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $table = 'notification';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'user_id', 'title', 'message', 'is_read', 'link'
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}
