<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $table = 'request';

    protected $primaryKey = 'id';

    public $incrementing = false;
    public $timestamp = false;

    protected $fillable = [
      'id',
      'req_type',
      'party_id',
      'ship_to',
      'po_number',
      'po_date',
      'delivery_date',
      'valid_to'
    ];

    public function request_item(){
        return $this->hasMany('App\Models\RRQ\RequestItem')->with('product_feature');
    }
}
