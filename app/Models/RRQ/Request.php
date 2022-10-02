<?php

namespace App\Models\RRQ;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $table = 'request';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamp = true;

    protected $fillable = [
      'id',
      'req_type',
      'po_number',
    ];

    public function request_item(){
        return $this->hasMany('App\Models\RRQ\RequestItem')->with('product_feature');
    }

    public function status(){
      return $this->belongsTo('App\Models\RRQ\RequestStatus', 'id', 'request_id');
    }
}
