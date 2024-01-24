<?php

namespace App\Models\KITE;

use Illuminate\Database\Eloquent\Model;

class ExportDoc extends Model
{
    //

    protected $table = 'export_kite';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'date',
        'bl_number',
        'document_number',
        'order_id',
        'sales_order_id'
    ];

    public function order() {
        return $this->belongsTo('App\Models\Order\Order', 'order_id');
    }

    public function sales_order() {
        return $this->belongsTo('App\Models\Order\SalesOrder', 'sales_order_id')->with('party');
    }

    public function items(){
        return $this->hasMany('App\Models\KITE\ExportDocItem', 'export_doc_id')->with(['product' => function($query){ return $query->with('goods');}])->with('product_feature', 'order_item');
    }

}
