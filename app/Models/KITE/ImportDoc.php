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
        'type',
        'order_id',
        'purchase_order_id'
    ];

    public function items(){
        return $this->hasMany('App\Models\KITE\ImportDocItem', 'id', 'kite_import_doc_id');
    }

    public function purchase_order() {
        return $this->belongsTo('App\Models\Order\PurchaseOrder', 'purchase_order_id');
    }

    public function order() {
        return $this->belongsTo('App\Models\Order\Order', 'order_id');
    }

}
