<?php

use Illuminate\Database\Seeder;

class OrderTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('order')->delete();
        
        \DB::table('order')->insert(array (
            0 => 
            array (
                'id' => 2,
                'sales_order_id' => NULL,
                'purchase_order_id' => 2,
                'quote_id' => 2,
                'created_at' => '2022-09-04 16:42:10',
                'updated_at' => '2022-09-04 16:42:10',
            ),
            1 => 
            array (
                'id' => 3,
                'sales_order_id' => NULL,
                'purchase_order_id' => 3,
                'quote_id' => 3,
                'created_at' => '2022-09-04 16:42:35',
                'updated_at' => '2022-09-04 16:42:35',
            ),
            2 => 
            array (
                'id' => 4,
                'sales_order_id' => NULL,
                'purchase_order_id' => 4,
                'quote_id' => 4,
                'created_at' => '2022-09-04 16:44:53',
                'updated_at' => '2022-09-04 16:44:53',
            ),
            3 => 
            array (
                'id' => 5,
                'sales_order_id' => 1,
                'purchase_order_id' => NULL,
                'quote_id' => 5,
                'created_at' => '2022-09-06 02:53:49',
                'updated_at' => '2022-09-06 02:53:49',
            ),
            4 => 
            array (
                'id' => 6,
                'sales_order_id' => NULL,
                'purchase_order_id' => 5,
                'quote_id' => 2,
                'created_at' => '2022-09-13 01:34:18',
                'updated_at' => '2022-09-13 01:34:18',
            ),
            5 => 
            array (
                'id' => 7,
                'sales_order_id' => 2,
                'purchase_order_id' => NULL,
                'quote_id' => 8,
                'created_at' => '2022-09-13 02:37:46',
                'updated_at' => '2022-09-13 02:37:46',
            ),
            6 => 
            array (
                'id' => 8,
                'sales_order_id' => 3,
                'purchase_order_id' => NULL,
                'quote_id' => 9,
                'created_at' => '2022-09-13 02:38:28',
                'updated_at' => '2022-09-13 02:38:28',
            ),
            7 => 
            array (
                'id' => 11,
                'sales_order_id' => 6,
                'purchase_order_id' => NULL,
                'quote_id' => 10,
                'created_at' => '2022-09-13 02:40:16',
                'updated_at' => '2022-09-13 02:40:16',
            ),
            8 => 
            array (
                'id' => 12,
                'sales_order_id' => 7,
                'purchase_order_id' => NULL,
                'quote_id' => 11,
                'created_at' => '2022-09-18 23:25:58',
                'updated_at' => '2022-09-18 23:25:58',
            ),
            9 => 
            array (
                'id' => 13,
                'sales_order_id' => 8,
                'purchase_order_id' => NULL,
                'quote_id' => 12,
                'created_at' => '2022-09-19 01:33:34',
                'updated_at' => '2022-09-19 01:33:34',
            ),
            10 => 
            array (
                'id' => 14,
                'sales_order_id' => 9,
                'purchase_order_id' => NULL,
                'quote_id' => 13,
                'created_at' => '2022-09-19 02:50:15',
                'updated_at' => '2022-09-19 02:50:15',
            ),
            11 => 
            array (
                'id' => 15,
                'sales_order_id' => 10,
                'purchase_order_id' => NULL,
                'quote_id' => 14,
                'created_at' => '2022-09-19 03:04:50',
                'updated_at' => '2022-09-19 03:04:50',
            ),
            12 => 
            array (
                'id' => 16,
                'sales_order_id' => 11,
                'purchase_order_id' => NULL,
                'quote_id' => 15,
                'created_at' => '2022-09-19 03:25:54',
                'updated_at' => '2022-09-19 03:25:54',
            ),
            13 => 
            array (
                'id' => 17,
                'sales_order_id' => 12,
                'purchase_order_id' => NULL,
                'quote_id' => 16,
                'created_at' => '2022-09-20 03:31:42',
                'updated_at' => '2022-09-20 03:31:42',
            ),
            14 => 
            array (
                'id' => 18,
                'sales_order_id' => NULL,
                'purchase_order_id' => NULL,
                'quote_id' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 19,
                'sales_order_id' => NULL,
                'purchase_order_id' => NULL,
                'quote_id' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 20,
                'sales_order_id' => NULL,
                'purchase_order_id' => 6,
                'quote_id' => 18,
                'created_at' => '2022-09-23 08:05:23',
                'updated_at' => '2022-09-23 08:05:23',
            ),
        ));
        
        
    }
}