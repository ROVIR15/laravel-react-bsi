<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class OperationResult extends Model
{
    //
    protected $table = 'operation_result';

    protected $primaryKey = 'id';
    public $timestamp = true;
    public $incrementing = true;

    protected $fillable = [
        'manufacture_operation_id',
        'party_id',
        'qty_produced',
    ];

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'party_id', 'id');
    }
}
