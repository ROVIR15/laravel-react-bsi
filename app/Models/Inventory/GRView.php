<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class GRView extends Model
{
    //
    protected $table = 'goods_receipt_view';

    public function items(){
        return $this->hasMany('App\Models\Inventory\GRItemView', 'goods_receipt_id', 'id');
    }

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'bought_from', 'id');
    }

    public function facility(){
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id', 'id')->with('type');
    }
}
