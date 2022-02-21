<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Factory extends Model
{
    protected $table = 'factory';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'name',
        'update_time'
    ];
}
