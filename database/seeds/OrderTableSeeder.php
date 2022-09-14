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
        ));
        
        
    }
}