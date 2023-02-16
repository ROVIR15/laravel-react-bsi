<?php

namespace App\Models\General;

use Illuminate\Database\Eloquent\Model;

class PagesAccess extends Model
{
    protected $table = 'pages_access';

    protected $primaryKey = 'id';
    public $timestamps = false;
    public $incrementing = true;

    protected $fillable = [
        'id',
        'users_id',
        'pages_id',
        'name',
        'insert',
        'delete',
        'edit'
    ];

    public function user(){
        return $this->belongsTo('App\User', 'users_id');
    }

    public function page(){
        return $this->belongsTo('App\Models\General\Pages', 'pages_id');
    }
    
}
