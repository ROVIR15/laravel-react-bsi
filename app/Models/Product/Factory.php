<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Factory extends Model
{
    protected $table = 'factory';

    protected $primaryKey = 'id';

    public $incrementing = true;
    
    public $timestamps = false;

    protected $fillable = [
        'id',
        'factory_type',
    ];
}
