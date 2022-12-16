<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class InvoiceStatus extends Model
{
    //
    protected $table = 'invoice_status';

    protected $primaryKey = 'id';

    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        'invoice_id',
        'invoice_status_type_id'
    ];

    public function type(){
        return $this->belongsTo('App\Models\Invoice\InvoiceStatusType', 'invoice_status_type_id');
    }

}
