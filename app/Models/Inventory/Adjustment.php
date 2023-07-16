<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class Adjustment extends Model
{
    //adjustment
    protected $table = 'adjustment';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'facility_id',
        'change_type',
        'date'
    ];

    public function items()
    {
        return $this->hasMany('App\Models\Inventory\AdjustmentItem');
    }

    public function facility()
    {
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id');
    }

    public function user()
    { 
        return $this->belongsTo('App\User', 'user_id');
    }

}
