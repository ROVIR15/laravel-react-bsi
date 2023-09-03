<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;

class POBuyerProof extends Model
{
    //
    protected $table = 'po_buyer_proof';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'tanggal_po',
        'nomor_po',
        'sales_order_id',
        'order_id',
        'imageUrl'
    ];
}
