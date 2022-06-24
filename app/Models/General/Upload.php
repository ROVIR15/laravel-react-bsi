<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    protected $table = 'file_upload';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'name',
        'created_at',
        'updated_at'
    ];
}
