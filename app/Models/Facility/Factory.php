<?php

namespace App\Models\Facility;

use Illuminate\Database\Eloquent\Model;

class Factory extends Model
{
    protected $table = 'factory';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'description'
    ];

    public function items(){
        return $this->hasMany('App\Models\Facility\FactoryHasFacility', 'factory_id', 'id')->with('info');
    }

}
