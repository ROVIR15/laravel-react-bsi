<?php

namespace App\Models\Shipment;

use Illuminate\Database\Eloquent\Model;

class ItemIssuance extends Model
{
    protected $table = 'item_issuance';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id'
    ];
}
