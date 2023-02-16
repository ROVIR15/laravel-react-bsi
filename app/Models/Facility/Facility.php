<?php

namespace App\Models\Facility;

use Illuminate\Database\Eloquent\Model;

class Facility extends Model
{
    //
    protected $table = 'facility';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'name',
        'type'
    ];

    public function type(){
        return $this->belongsTo('App\Models\Facility\FacilityType', 'facility_type_id', 'id');
    }
}
