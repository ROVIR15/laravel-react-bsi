<?php

namespace App\Models\UserManagement;

use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    protected $table = 'pages';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
    ];
    
}
