<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class RequirementHasRequestItem extends Model
{
    protected $table = 'requirement_has_request_item';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'requirement_id',
        'request_item_id'
    ];
}
