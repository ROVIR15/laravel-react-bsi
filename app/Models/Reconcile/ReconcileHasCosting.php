<?php

namespace App\Models\Reconcile;

use Illuminate\Database\Eloquent\Model;

class ReconcileHasCosting extends Model
{
    protected $table = 'reconcile_has_costing';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'reconcile_id',
        'costing_id'
    ];

    public function costing(){
        return $this->belongsTo('App\Models\Manufacture\BOM', 'costing_id', 'id')->with('bom_items', 'bom_services')->with(['operation' => function($query) { return $query->with('work_center'); }]);
    }
}
