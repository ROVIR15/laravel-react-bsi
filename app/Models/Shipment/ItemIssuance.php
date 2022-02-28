<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ItemIssuance extends Model
{
    protected $table = 'item_issuance';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'id'
    ];
}
