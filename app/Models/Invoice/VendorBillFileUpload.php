<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class VendorBillFileUpload extends Model
{
    //
    protected $table = 'vendor_bill_file_upload';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'tanggal_inv',
        'nomor_inv',
        'invoice_id',
        'url'
    ];
}
