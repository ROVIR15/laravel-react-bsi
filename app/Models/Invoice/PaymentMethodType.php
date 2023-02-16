<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class PaymentMethodType extends Model
{
    //
    protected $table = 'payment_method_type';

    protected $primaryKey = 'id';

    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
    ];
}
