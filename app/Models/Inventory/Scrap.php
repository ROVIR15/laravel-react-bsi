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
        'document_number',
        'date'
    ];

    public function items() {
        return $this->hasMany('App\Models\Inventory\ScrapItem', 'scrap_id', 'id');
    }

}
