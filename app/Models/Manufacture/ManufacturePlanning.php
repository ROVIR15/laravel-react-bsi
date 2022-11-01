<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class ManufacturePlanning extends Model
{
    //
    protected $table = 'manufacture_planning';

    protected $primaryKey = 'id';

    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'month',
        'year'
    ];

    public function items() {
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems')->with('sales_order');
    }

    public function items_with_price() {
        return $this->hasMany('App\Models\Manufacture\ManufacturePlanningItems')->with('info', 'ckck');
    }
}
