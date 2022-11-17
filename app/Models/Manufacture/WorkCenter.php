<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class WorkCenter extends Model
{
    protected $table = 'work_center';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = false;

    protected $fillable = [
        'id',
        'name',
        'work_hours',
        'layout_produksi',
        'company_name',
        'overhead_cost',
        'prod_capacity',
        'cost_per_hour',
        'labor_alloc',
        'oee_target',
        'goods_id',
        'description'
    ];

    public function operation(){
        return $this->hasMany('App\Models\Manufacture\Operation');
    }

    public function goods(){
        return $this->belongsTo('App\Models\Product\Goods', 'goods_id', 'id');
    }

}
