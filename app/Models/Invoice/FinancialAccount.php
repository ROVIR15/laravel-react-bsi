<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class FinancialAccount extends Model
{
    //
    protected $table = 'financial_account';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'financial_account_type_id',
        'account_name',
        'account_number'
    ];

    public function type(){
        return $this->belongsTo('App\Models\Invoice\FinancialAccountType', 'financial_account_type_id');
    }
}
