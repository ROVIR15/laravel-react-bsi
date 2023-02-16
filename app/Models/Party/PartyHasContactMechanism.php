<?php

namespace App\Models\Party;

use Illuminate\Database\Eloquent\Model;

class PartyHasContactMechanism extends Model
{
    //
    protected $table = 'party_has_contact_mechanism';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'party_id',
        'contact_mechanism_id'
    ];

    public function contact_mechanism()
    {
        return $this->belongsTo('App\Models\Party\ContactMechanism', 'contact_mechanism_id');
    }

    public function info_address()
    {
        return $this->belongsTo('App\Models\Party\PostalAddress', 'contact_mechanism_id', 'contact_mechanism_id');
    }

    public function info_email()
    {
        return $this->belongsTo('App\Models\Party\Email', 'contact_mechanism_id', 'contact_mechanism_id');
    }

    public function info_number()
    {
        return $this->belongsTo('App\Models\Party\TelecommunicationNumber', 'contact_mechanism_id', 'contact_mechanism_id');
    }
}
