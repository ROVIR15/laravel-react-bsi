<?php

use Illuminate\Database\Seeder;

class InvoiceTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('invoice_type')->delete();
        
        \DB::table('invoice_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Invoice Bills',
                'description' => 'Invoice for sales_order',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Vendor Bills',
                'description' => 'Invoice for purchase_order',
            ),
        ));
        
        
    }
}