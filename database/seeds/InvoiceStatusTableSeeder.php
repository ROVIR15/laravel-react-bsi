<?php

use Illuminate\Database\Seeder;

class InvoiceStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('invoice_status')->delete();
        
        \DB::table('invoice_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'invoice_id' => 15,
                'invoice_status_type_id' => 2,
                'created_at' => '2022-12-16 10:20:31',
                'updated_at' => '2022-12-16 10:20:31',
            ),
            1 => 
            array (
                'id' => 2,
                'invoice_id' => 15,
                'invoice_status_type_id' => 2,
                'created_at' => '2022-12-16 10:21:02',
                'updated_at' => '2022-12-16 10:21:02',
            ),
            2 => 
            array (
                'id' => 3,
                'invoice_id' => 15,
                'invoice_status_type_id' => 2,
                'created_at' => '2022-12-16 10:21:36',
                'updated_at' => '2022-12-16 10:21:36',
            ),
            3 => 
            array (
                'id' => 4,
                'invoice_id' => 15,
                'invoice_status_type_id' => 2,
                'created_at' => '2022-12-16 10:22:08',
                'updated_at' => '2022-12-16 10:22:08',
            ),
        ));
        
        
    }
}