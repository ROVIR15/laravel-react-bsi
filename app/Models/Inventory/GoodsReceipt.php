<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class GoodsReceipt extends Model
{
    protected $table = 'goods_receipt';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'purchase_order_id',
        'facility_id'
    ];

    public function items(){
        return $this->hasMany('App\Models\Inventory\GoodsReceiptItems', 'goods_receipt_id', 'id');
    }

    public function facility(){
        return $this->belongsTo('App\Models\Facility\Facility', 'facility_id', 'id')->with('type');
    }
}
