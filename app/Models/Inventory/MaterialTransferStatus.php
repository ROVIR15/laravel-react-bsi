<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;

class MaterialTransferStatus extends Model
{
    protected $table = 'material_transfer_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'material_transfer_id',
        'status'
    ];
}
