<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    //
    protected $table = 'email';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'contact_mechanism_id',
        'name',
    ];   
}
