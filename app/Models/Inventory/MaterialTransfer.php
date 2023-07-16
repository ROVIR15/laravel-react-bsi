<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class MaterialTransfer extends Model
{
    //
    protected $table = 'material_transfer';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'from_facility_id',
        'to_facility_id',
        'date',
        'est_transfer_date',
        'party_id',
        'user_id',
        'description'
    ];

    public function items()
    {
        return $this->hasMany('App\Models\Inventory\MaterialTransferItem', 'material_transfer_id', 'id');
    }

    public function status()
    {
        return $this->hasMany('App\Models\Inventory\MaterialTransferStatus')->orderBy('created_at', 'desc');
    }

    public function to_facility()
    {
        return $this->belongsTo('App\Models\Facility\Facility', 'to_facility_id');
    }

    public function from_facility()
    {
        return $this->belongsTo('App\Models\Facility\Facility', 'from_facility_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    // public function realisation(){
    //     return $this->hasMany('App\Models\Inventory\MaterialTransferRealisation');
    // }
}
