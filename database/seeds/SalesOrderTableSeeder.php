<?php

use Illuminate\Database\Seeder;

class SalesOrderTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('sales_order')->delete();
        
        \DB::table('sales_order')->insert(array (
            0 => 
            array (
                'id' => 1,
                'po_number' => '22/1J002',
                'order_id' => 5,
                'sold_to' => 2,
                'ship_to' => 3,
                'issue_date' => '2022-09-08',
                'delivery_date' => '2022-09-13',
                'valid_thru' => '2022-09-10',
                'created_at' => '2022-09-06 02:53:49',
                'updated_at' => '2022-09-06 02:53:49',
            ),
            1 => 
            array (
                'id' => 2,
                'po_number' => 'KKS-EMBA01',
                'order_id' => 7,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-08',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-10',
                'created_at' => '2022-09-13 02:37:46',
                'updated_at' => '2022-09-13 02:37:46',
            ),
            2 => 
            array (
                'id' => 3,
                'po_number' => 'KKS-EMBA02',
                'order_id' => 8,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-11',
                'valid_thru' => '2022-09-03',
                'created_at' => '2022-09-13 02:38:28',
                'updated_at' => '2022-09-13 02:38:28',
            ),
            3 => 
            array (
                'id' => 6,
                'po_number' => 'KKS-EMBA03',
                'order_id' => 11,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-16',
                'created_at' => '2022-09-13 02:40:16',
                'updated_at' => '2022-09-13 02:40:16',
            ),
        ));
        
        
    }
}