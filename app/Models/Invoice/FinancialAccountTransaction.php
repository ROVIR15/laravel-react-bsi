<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class FinancialAccountTransaction extends Model
{
    //
    protected $table = 'financial_account_transaction';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'financial_account_id',
        'payment_id',
        'ref_num',
        'trx_type_id',
        'trx_date',
        'trx_amount'
    ];

    public function financial_account() {
        return $this->belongsTo('App\Models\Invoice\FinancialAccount');
    }

    public function payment() {
        return $this->hasMany('App\Models\Invoice\Payment');
    }

    public function trx_type(){
        return $this->belongsTo('App\Models\Invoice\TrxType');
    }
}
