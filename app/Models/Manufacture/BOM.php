<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class BOM extends Model
{
    protected $table = 'bom';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'id',
        'party_id',
        'product_id',
        'product_feature_id',
        'margin',
        'final_price',
        'tax',
        'name',
        'qty',
        'start_date',
        'end_date',
        'company_name'
    ];

    public function bom_items(){
        return $this->hasMany('App\Models\Manufacture\BOMItem', 'bom_id');
    }

    public function bom_services(){
        return $this->hasMany('App\Models\Manufacture\BOMService', 'bom_id');
    }

    public function variant(){
        return $this->belongsTo('App\Models\Product\ProductFeature', 'product_feature_id', 'id');
    }

    public function product(){
        return $this->belongsTo('App\Models\Product\Product', 'product_id', 'id')->with('goods');
    }

    public function operation(){
        return $this->hasMany('App\Models\Manufacture\Operation', 'bom_id');
    }

    public function status(){
        return $this->hasMany('App\Models\Manufacture\BOMStatus', 'bom_id')->orderBy('created_at', 'desc');;
    }

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'party_id');
    }
    
}
