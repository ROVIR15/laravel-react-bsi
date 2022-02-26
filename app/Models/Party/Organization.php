<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    protected $table = 'organization';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;
    
    protected $fillable = [
        'id'
    ];
}