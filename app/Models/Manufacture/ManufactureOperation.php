<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class ManufactureOperation extends Model
{
    //
    protected $table = 'manufacture_operation';

    protected $primaryKey = 'id';

    public $timestamp = false;
    public $incrementing = false;

    protected $fillable = [
        'manufacture_id',
        'operation_id'
    ];

    public function result(){
        return $this->hasMany('App\Models\Manufacture\OperationResult', 'manufacture_operation_id');
    }

    public function operation(){
        return $this->belongsTo('App\Models\Manufacture\Operation', 'operation_id', 'id')->with('work_center');
    }

    public function manufacture(){
        return $this->belongsTo('App\Models\Manufacture\Manufacture', 'manufacture_id', 'id');
    }

}
