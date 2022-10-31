<?php
  
  namespace App\Models\Manufacture;
  
  use Illuminate\Database\Eloquent\Model;
  
  class BOMStatus extends Model
  {
    protected $table = 'bom_status';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'description',
        'unit_price',
        'status_type',
        'user_id',
        'bom_id',
        'id'
    ];

    public function bom() {
        return $this->belongsTo('App\Models\Manufacture\BOM', 'bom_id');
    }
  }
