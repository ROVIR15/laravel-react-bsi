<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class PostalAddress extends Model
{
    //
    protected $table = 'postal_address';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'flag',
        'contact_mechanism_id',
        'street',
        'city',
        'province',
        'country',
        'postal_code'
    ];

    
}
