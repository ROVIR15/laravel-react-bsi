<?php

use Illuminate\Database\Seeder;

class InvoiceStatusTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('invoice_status_type')->delete();
        
        \DB::table('invoice_status_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'paid',
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'unpaid',
                'description' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'partial',
                'description' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'none',
                'description' => NULL,
            ),
        ));
        
        
    }
}