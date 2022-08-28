<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class RoleType extends Model
{
    protected $table = 'role_type';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'role',
        'name'
    ];
}
