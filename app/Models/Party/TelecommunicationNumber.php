<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class TelecommunicationNumber extends Model
{
    //
    protected $table = 'telecommunication_number';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'flag',
        'contact_mechanism_id',
        'number'
    ];

    
}
