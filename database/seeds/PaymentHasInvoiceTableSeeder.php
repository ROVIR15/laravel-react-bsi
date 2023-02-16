<?php

use Illuminate\Database\Seeder;

class PaymentHasInvoiceTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('payment_has_invoice')->delete();
        
        
        
    }
}