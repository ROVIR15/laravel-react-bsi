<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class ProductionStudy extends Model
{
    protected $table = 'production_study';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'product_feature_id',
        'work_center_id'
    ];

}
