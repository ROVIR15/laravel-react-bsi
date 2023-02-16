<?php

use Illuminate\Database\Seeder;

class InvoiceTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('invoice')->delete();
        
        \DB::table('invoice')->insert(array (
            0 => 
            array (
                'id' => 12,
                'order_id' => 32,
                'shipment_id' => NULL,
                'invoice_date' => '2022-12-20',
                'sold_to' => 2,
                'description' => 'wkwkk',
                'tax' => 11,
                'created_at' => '2022-12-04 11:08:31',
                'updated_at' => '2022-12-04 11:48:39',
            ),
            1 => 
            array (
                'id' => 15,
                'order_id' => 8,
                'shipment_id' => NULL,
                'invoice_date' => '2022-12-23',
                'sold_to' => 1,
                'description' => '1. Lorenenenn',
                'tax' => 11,
                'created_at' => '2022-12-06 02:28:13',
                'updated_at' => '2022-12-06 02:28:13',
            ),
            2 => 
            array (
                'id' => 16,
                'order_id' => 8,
                'shipment_id' => NULL,
                'invoice_date' => '2023-01-04',
                'sold_to' => 2,
                'description' => 'done',
                'tax' => 11,
                'created_at' => '2022-12-16 09:43:12',
                'updated_at' => '2022-12-16 09:43:12',
            ),
            3 => 
            array (
                'id' => 17,
                'order_id' => 21,
                'shipment_id' => NULL,
                'invoice_date' => '2022-12-22',
                'sold_to' => 16,
                'description' => NULL,
                'tax' => 11,
                'created_at' => '2022-12-16 10:59:02',
                'updated_at' => '2022-12-16 10:59:02',
            ),
            4 => 
            array (
                'id' => 18,
                'order_id' => NULL,
                'shipment_id' => NULL,
                'invoice_date' => '2022-12-14',
                'sold_to' => 1,
                'description' => 'ddd',
                'tax' => 11,
                'created_at' => '2022-12-26 03:40:11',
                'updated_at' => '2022-12-26 03:40:11',
            ),
        ));
        
        
    }
}