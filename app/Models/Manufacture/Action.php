<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    protected $table = 'action';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'action_type_id',
        'manufacture_operation_id',
        'created_at'
    ];
}
