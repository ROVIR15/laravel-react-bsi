<?php

namespace App\Models\Facility;

use Illuminate\Database\Eloquent\Model;

class FactoryHasFacility extends Model
{
    protected $table = 'factory_has_facility';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'factory_id',
        'facility_id'
    ];

    public function info(){
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id', 'id')->with('type');
    }
}
