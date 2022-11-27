<?php

namespace App\Models\Product;

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

    public function facility(){
        return $this->hasMany('App\Models\Facility\FactoryHasCategory', 'id', 'facility_id');
    }
}
