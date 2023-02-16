<?php

namespace App\Models\Finance;

use Illuminate\Database\Eloquent\Model;

class FinancialOrderBudgetItem extends Model
{
    //
    protected $table = 'financial_order_budget_item';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'financial_order_budget_id',
        'costing_id'
    ];
    
    public function files(){
        return $this->belongsTo('App\Models\Finance\FinancialOrderBudget', 'financial_order_budget_id');
    }

    public function costing(){
        return $this->belongsTo('App\Models\Manufacture\BOM', 'costing_id');
    }

    public function costing_goods(){
        return $this->hasManyThrough('App\Models\Manufacture\BOMItem', 'App\Models\Manufacture\BOM', 'id', 'bom_id', 'costing_id')->with('product_feature');
    }
    
    public function costing_cmt(){
        return $this->hasManyThrough('App\Models\Manufacture\BOMItem', 'App\Models\Manufacture\BOM', 'id', 'bom_id', 'costing_id');
    }

    public function costing_service(){
        return $this->hasManyThrough('App\Models\Manufacture\BOMService', 'App\Models\Manufacture\BOM', 'id', 'bom_id', 'costing_id')->with('product');
    }
}
