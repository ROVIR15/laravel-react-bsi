<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class FinancialAccountType extends Model
{
    //
    protected $table = 'financial_account_type';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'description'
    ];
}
