<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;

class CompletionStatus extends Model
{
    protected $table = 'completion_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'description',
        'name',
        'id'
    ];
}
