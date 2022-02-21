<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class RequirementHasRequest extends Model
{
    protected $table = 'requirement_has_request';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'requirement_id',
        'request_id'
    ];
}
