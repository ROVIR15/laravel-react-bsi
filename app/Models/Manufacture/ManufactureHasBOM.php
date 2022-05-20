<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class ManufactureHasBOM extends Model
{
    //
    protected $table = 'manufacture_has_bom';

    public $timestamps = false;
    public $incrementing = false;

    protected $fillable = [
        'bom_id',
        'manufacture_id'
    ];

    public function bom(){
        return $this->belongsTo('App\Models\Manufacture\BOM', 'bom_id', 'id');
    }

    public function manufacture(){
        return $this->belongsTo('App\Models\Manufacture\Manufacture', 'manufacture_id', 'id')->with(
            'operation',
            'component'
        );
    }
}
