<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;

class OrderConfrimed extends Model
{
    protected $table = 'order_confirmed';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = true;

    protected $fillable = [
        'id',
        'order_id',
        'total_qty',
        'amount_of_money'
    ];

    public function order() {
        return $this->belongsTo('App\Models\Order\Order', 'order_id');
    }

}
