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
            4 => 
            array (
                'id' => 6,
                'order_id' => 20,
                'po_number' => 'FAB HDE-0922-BIENSIDanjyo - 002',
                'bought_from' => 10,
                'ship_to' => 1,
                'issue_date' => '2022-09-22',
                'delivery_date' => '2022-09-22',
                'valid_thru' => '2022-09-30',
                'created_at' => '2022-09-23 08:05:23',
                'updated_at' => '2022-09-23 08:05:23',
            ),
            5 => 
            array (
                'id' => 7,
                'order_id' => 21,
                'po_number' => 'FAB-HDE-0922-BIENSI-001',
                'bought_from' => 11,
                'ship_to' => 7,
                'issue_date' => '2022-09-20',
                'delivery_date' => '2022-09-28',
                'valid_thru' => '2022-10-10',
                'created_at' => '2022-10-03 03:39:03',
                'updated_at' => '2022-10-03 03:39:03',
            ),
            6 => 
            array (
                'id' => 8,
                'order_id' => 22,
                'po_number' => '001CMTHDE/SUP/HDEJKT/CMT ACC/22',
                'bought_from' => 12,
                'ship_to' => 7,
                'issue_date' => '2022-10-04',
                'delivery_date' => '2022-10-05',
                'valid_thru' => '2022-10-18',
                'created_at' => '2022-10-04 03:31:28',
                'updated_at' => '2022-10-04 03:31:28',
            ),
            7 => 
            array (
                'id' => 9,
                'order_id' => 32,
                'po_number' => '003CMTHDE/SUP/HDEJKT/CMT ACC/1022',
                'bought_from' => 12,
                'ship_to' => 7,
                'issue_date' => '2022-10-11',
                'delivery_date' => '2022-10-19',
                'valid_thru' => '2022-10-24',
                'created_at' => '2022-10-17 05:49:19',
                'updated_at' => '2022-10-17 05:49:19',
            ),
        ));
        
        
    }
}