<?php

use Illuminate\Database\Seeder;

class InvoiceItemTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('invoice_item')->delete();
        
        \DB::table('invoice_item')->insert(array (
            0 => 
            array (
                'id' => 14,
                'invoice_id' => 12,
                'shipment_item_id' => NULL,
                'order_item_id' => 261,
                'qty' => 30,
                'amount' => 11700,
                'created_at' => '2022-12-04 18:08:31',
                'updated_at' => '2022-12-04 18:08:31',
            ),
            1 => 
            array (
                'id' => 15,
                'invoice_id' => 12,
                'shipment_item_id' => NULL,
                'order_item_id' => 262,
                'qty' => 50,
                'amount' => 11700,
                'created_at' => '2022-12-04 18:08:31',
                'updated_at' => '2022-12-04 18:08:31',
            ),
            2 => 
            array (
                'id' => 19,
                'invoice_id' => 15,
                'shipment_item_id' => NULL,
                'order_item_id' => 31,
                'qty' => 80,
                'amount' => 28000,
                'created_at' => '2022-12-06 09:28:13',
                'updated_at' => '2022-12-06 09:28:13',
            ),
            3 => 
            array (
                'id' => 20,
                'invoice_id' => 15,
                'shipment_item_id' => NULL,
                'order_item_id' => 32,
                'qty' => 80,
                'amount' => 28000,
                'created_at' => '2022-12-06 09:28:13',
                'updated_at' => '2022-12-06 09:28:13',
            ),
            4 => 
            array (
                'id' => 21,
                'invoice_id' => 16,
                'shipment_item_id' => NULL,
                'order_item_id' => 32,
                'qty' => 80,
                'amount' => 28000,
                'created_at' => '2022-12-16 16:43:12',
                'updated_at' => '2022-12-16 16:43:12',
            ),
            5 => 
            array (
                'id' => 22,
                'invoice_id' => 16,
                'shipment_item_id' => NULL,
                'order_item_id' => 33,
                'qty' => 200,
                'amount' => 28000,
                'created_at' => '2022-12-16 16:43:12',
                'updated_at' => '2022-12-16 16:43:12',
            ),
            6 => 
            array (
                'id' => 23,
                'invoice_id' => 17,
                'shipment_item_id' => NULL,
                'order_item_id' => 133,
                'qty' => 1000,
                'amount' => 44800,
                'created_at' => '2022-12-16 17:59:02',
                'updated_at' => '2022-12-16 17:59:02',
            ),
            7 => 
            array (
                'id' => 24,
                'invoice_id' => 17,
                'shipment_item_id' => NULL,
                'order_item_id' => 134,
                'qty' => 1000,
                'amount' => 44800,
                'created_at' => '2022-12-16 17:59:02',
                'updated_at' => '2022-12-16 17:59:02',
            ),
        ));
        
        
    }
}