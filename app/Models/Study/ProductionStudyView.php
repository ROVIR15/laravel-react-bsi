<?php

namespace App\Models\Study;

use Illuminate\Database\Eloquent\Model;

class ProductionStudyView extends Model
{
    protected $table = 'production_study_view';
    
    public function process_list(){
        return $this->hasMany('App\Models\Study\ProcessStudyView', 'production_study_id', 'id');
    }
}
