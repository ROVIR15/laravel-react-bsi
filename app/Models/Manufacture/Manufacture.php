<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class Manufacture extends Model
{
    //
    protected $table = 'manufacture';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = true;

    protected $fillable = [
        'party_id',
        'qty',
        'start_date',
        'end_date'
    ];

    public function bom(){
        return $this->belongsTo('App\Models\Manufacture\ManufactureHasBOM', 'id', 'manufacture_id')->with('bom');
    }

    public function operation(){
        return $this->hasMany('App\Models\Manufacture\ManufactureOperation')->with('operation');
    }

    public function component(){
        return $this->hasMany('App\Models\Manufacture\ManufactureComponent')->with('inventory_item');
    }

    public function status(){
        return $this->hasMany('App\Models\Manufacture\ManufactureStatus', 'id', 'manufacture_id')->with('status_type');
    }
}
