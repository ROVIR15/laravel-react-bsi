<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class SamplingStudy extends Model
{
    //
    protected $table = 'sampling_study';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'product_id',
        'work_center_id'
    ];

    public function data(){
        return $this->hasMany('App\Models\Study\SampleProcessStudy', 'sampling_study_id', 'id');
    }

    public function work_center(){
        return $this->belongsTo('App\Models\Manufacture\WorkCenter', 'work_center_id', 'id');
    }

    public function product(){
        return $this->belongsTo('App\Models\Product\ProductInformationView', 'product_id', 'id');
    }
}
