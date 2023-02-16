<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class ContactMechanism extends Model
{
    //
    protected $table = 'contact_mechanism';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'contact_mechanism_type_id'
    ];

    public function has_postal_address(){
        return $this->belongsTo('App\Models\Party\PostalAddress', 'id', 'contact_mechanism_id');
    }

    public function has_email(){
        return $this->hasMany('App\Models\Party\Email');
    }

    public function has_telecommunication_number(){
        return $this->hasMany('App\Models\Party\TelecommunicationNumber');
    }

}
