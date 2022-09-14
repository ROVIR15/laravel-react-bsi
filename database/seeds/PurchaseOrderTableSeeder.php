<?php

use Illuminate\Database\Seeder;

class PurchaseOrderTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('purchase_order')->delete();
        
        \DB::table('purchase_order')->insert(array (
            0 => 
            array (
                'id' => 2,
                'order_id' => 2,
                'po_number' => '22/1J002',
                'bought_from' => 5,
                'ship_to' => 7,
                'issue_date' => '2022-08-28',
                'delivery_date' => '2022-09-03',
                'valid_thru' => '2022-09-29',
                'created_at' => '2022-09-04 16:42:10',
                'updated_at' => '2022-09-04 16:42:10',
            ),
            1 => 
            array (
                'id' => 3,
                'order_id' => 3,
                'po_number' => '22/1J003',
                'bought_from' => 5,
                'ship_to' => 7,
                'issue_date' => '2022-08-27',
                'delivery_date' => '2022-09-05',
                'valid_thru' => '2022-09-02',
                'created_at' => '2022-09-04 16:42:35',
                'updated_at' => '2022-09-04 16:42:35',
            ),
            2 => 
            array (
                'id' => 4,
                'order_id' => 4,
                'po_number' => '22/1J004',
                'bought_from' => 5,
                'ship_to' => 7,
                'issue_date' => '2022-08-31',
                'delivery_date' => '2022-09-06',
                'valid_thru' => '2022-09-03',
                'created_at' => '2022-09-04 16:44:53',
                'updated_at' => '2022-09-04 16:44:53',
            ),
            3 => 
            array (
                'id' => 5,
                'order_id' => 6,
                'po_number' => '22/1J002',
                'bought_from' => 5,
                'ship_to' => 7,
                'issue_date' => '2022-08-28',
                'delivery_date' => '2022-09-03',
                'valid_thru' => '2022-09-29',
                'created_at' => '2022-09-13 01:34:18',
                'updated_at' => '2022-09-13 01:34:18',
            ),
        ));
        
        
    }
}