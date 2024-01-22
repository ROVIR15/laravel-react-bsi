<?php

namespace App\Models\Inventory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Scrap extends Model
{
    protected $table = 'scrap';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'material_transfer_id',
        'document_number',
        'date',
        'type'
    ];

    public function items() {
        return $this->hasMany('App\Models\Inventory\ScrapItem', 'scrap_id', 'id');
    }

}
