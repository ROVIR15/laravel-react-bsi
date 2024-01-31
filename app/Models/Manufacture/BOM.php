<?php

namespace App\Models\Manufacture;

use Illuminate\Database\Eloquent\Model;

class BOM extends Model
{
    protected $table = 'bom';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'currency_id',
        'party_id',
        'product_id',
        'product_feature_id',
        'margin',
        'starting_price',
        'final_price',
        'tax',
        'name',
        'qty',
        'start_date',
        'end_date',
        'company_name'
    ];

    public function currency_info(){
        return $this->belongsTo('App\Models\FInance\Currency', 'currency_id');
    }

    public function bom_items(){
        return $this->hasMany('App\Models\Manufacture\BOMItem', 'bom_id');
    }

    public function items(){
        return $this->hasMany('App\Models\Manufacture\BOMItem', 'bom_id')->with('product_feature', 'import_item');
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
        return $this->hasMany('App\Models\Manufacture\BOMStatus', 'bom_id')->with('user')->orderBy('created_at', 'desc');
    }

    public function party(){
        return $this->belongsTo('App\Models\Party\Party', 'party_id');
    }

    public function get_target_output(){
        return $this->belongsTo('App\Models\Manufacture\Operation', 'id', 'bom_id')->select('id', 'bom_id', 'work_center_id')->with(['work_center' => function($query){
            $query->select('id', 'prod_capacity');
        }]);
    }

    public function info(){
        return $this->hasMany('App\Models\Manufacture\BOMItem', 'bom_id');
    }
    
}
