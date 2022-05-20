<?php

namespace App\Models\Facility;

use Illuminate\Database\Eloquent\Model;

class FacilityType extends Model
{
    //
    protected $table = 'facility_type';

    public function facilities(){
        return $this->hasMany('App\Models\Facility\Facility');
    }
}
