<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Factory extends Model
{
    protected $table = 'factory';

    protected $primaryKey = 'id';

    public $incrementing = false;
    
    public $timestamps = false;

    protected $fillable = [
        'id',
        'factory_type',
    ];
}
