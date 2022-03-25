<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class WorkCenter extends Model
{
    protected $table = 'work_center';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'name',
        'work_hours',
        'company_name',
        'time_efficiency',
        'prod_capacity',
        'cost_per_hour',
        'oee_target',
        'description'
    ];

    public function operation(){
        return $this->hasMany('App\Models\Manufacture\Operation');
    }

}
