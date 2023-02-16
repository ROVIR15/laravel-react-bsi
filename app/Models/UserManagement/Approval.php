<?php

namespace App\Models\UserManagement;

use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    protected $table = 'approval';
    protected $primaryKey = 'id';
    protected $fillable= [
        'user_id',
        'name',
        'submit',
        'review',
        'approve'
    ];

    public function user() {
        return $this->belongsTo('App\User', 'user_id');
    }
}
