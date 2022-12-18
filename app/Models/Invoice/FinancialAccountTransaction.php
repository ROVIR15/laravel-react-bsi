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
        'trx_date',
        'trx_type',
        'trx_amount'
    ];


}
