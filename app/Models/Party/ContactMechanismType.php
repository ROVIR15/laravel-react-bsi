<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class ContactMechanismType extends Model
{
    //
    protected $table = 'contact_mechanism_type';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description'
    ];

    
}
