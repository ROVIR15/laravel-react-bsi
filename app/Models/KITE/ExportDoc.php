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
        'document_number',
        'order_id',
        'sales_order_id'
    ];

    public function order() {
        return $this->belongsTo('App\Models\Order\Order', 'order_id');
    }

}
