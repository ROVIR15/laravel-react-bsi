<?php
  
  namespace App\Models\RRQ;
  
  use Illuminate\Database\Eloquent\Model;
  
  class QuoteStatus extends Model
  {
    protected $table = 'quote_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'description',
        'status_type',
        'user_id',
        'quote_id',
    ];

    public function quote() {
        return $this->belongsTo('App\Models\RRQ\Quote', 'quote_id');
    }
  }
