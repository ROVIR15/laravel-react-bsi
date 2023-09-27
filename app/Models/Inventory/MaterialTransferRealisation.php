<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class MaterialTransferRealisation extends Model
{
    protected $table = 'material_transfer_item_realisation';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'material_transfer_id',
        'material_transfer_item_id',
        'costing_item_id',
        'transferred_qty'
    ];

    public function transffered(){
        return $this->belongsTo('App\Models\Inventory\MaterialTransferRealisation');
    }

    public function _mt(){
        return $this->belongsTo('App\Models\Inventory\MaterialTransfer', 'material_transfer_id')->with('facility');
    }

    public function info(){
        return $this->belongsTo('App\Models\Inventory\MaterialTransferItem', 'material_transfer_item_id')->with('product_feature', 'product');
    }

}
