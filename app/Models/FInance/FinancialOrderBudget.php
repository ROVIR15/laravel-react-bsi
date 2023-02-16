<?php

namespace App\Models\Finance;

use Illuminate\Database\Eloquent\Model;

class FinancialOrderBudget extends Model
{
    //
    protected $table = 'financial_order_budget';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'month',
        'year'
    ];

    public function items(){
        return $this->hasMany('App\Models\Finance\FinancialOrderBudgetItem', 'financial_order_budget_id');
    }
}
