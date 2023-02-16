<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    protected $table = 'approval';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'user_id',
        'name',
        'submit',
        'review',
        'approve'
    ];

    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public function pages(){
        return $this->belongsTo('App\Models\UserManagement\Pages', 'pages_id');
    }
    
}
