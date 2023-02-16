<?php
  
  namespace App\Models\RRQ;
  
  use Illuminate\Database\Eloquent\Model;
  
  class RequestStatus extends Model
  {
    protected $table = 'request_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'description',
        'status_type',
        'user_id',
        'request_id',
        'id'
    ];

    public function request() {
        return $this->belongsTo('App\Models\RRQ\Request', 'request_id');
    }
  }
