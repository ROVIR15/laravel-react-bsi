<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $table = 'operation';

    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'seq',
        'work_center_id',
        'bom_id'
    ];

    public function work_center(){
        return $this->belongsTo('App\Models\Manufacture\WorkCenter');
    }
}
