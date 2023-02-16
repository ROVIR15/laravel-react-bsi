<?php

use Illuminate\Database\Seeder;

class InvoiceHasInvoiceTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('invoice_has_invoice_type')->delete();
        
        \DB::table('invoice_has_invoice_type')->insert(array (
            0 => 
            array (
                'invoice_id' => 12,
                'invoice_type_id' => 2,
            ),
            1 => 
            array (
                'invoice_id' => 15,
                'invoice_type_id' => 1,
            ),
            2 => 
            array (
                'invoice_id' => 16,
                'invoice_type_id' => 1,
            ),
            3 => 
            array (
                'invoice_id' => 17,
                'invoice_type_id' => 2,
            ),
        ));
        
        
    }
}