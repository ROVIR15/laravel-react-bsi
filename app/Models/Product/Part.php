<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $table = 'Ppart';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
