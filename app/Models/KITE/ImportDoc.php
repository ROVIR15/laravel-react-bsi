<?php

namespace App\Models\KITE;

use Illuminate\Database\Eloquent\Model;

class ImportDoc extends Model
{
    //

    protected $table = 'kite_import_doc';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'date',
        'document_number',
        'bl_number',
        'pl_number',
        'type',
        'order_id',
        'purchase_order_id'
    ];

    public function items(){
        return $this->hasMany('App\Models\KITE\ImportDocItem', 'kite_import_doc_id')->with(['product' => function($query){ return $query->with('goods');}])->with('product_feature', 'order_item');
    }

    public function purchase_order() {
        return $this->belongsTo('App\Models\Order\PurchaseOrder', 'purchase_order_id')->with('party');
    }

    public function order() {
        return $this->belongsTo('App\Models\Order\Order', 'order_id');
    }

}
