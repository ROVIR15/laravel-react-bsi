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
                'po_number' => 'KKS-EMBA00-JAVIER',
                'order_id' => 5,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-08',
                'delivery_date' => '2022-09-13',
                'valid_thru' => '2022-09-10',
                'created_at' => '2022-09-06 02:53:49',
                'updated_at' => '2022-09-06 02:53:49',
            ),
            1 => 
            array (
                'id' => 2,
                'po_number' => 'KKS-EMBA01-JASPER',
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
                'po_number' => 'KKS-EMBA02-NUXVER',
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
                'po_number' => 'KKS-EMBA03-BS08',
                'order_id' => 11,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-16',
                'created_at' => '2022-09-13 02:40:16',
                'updated_at' => '2022-09-13 02:40:16',
            ),
            4 => 
            array (
                'id' => 7,
                'po_number' => 'BBI-AOI-J918',
                'order_id' => 12,
                'sold_to' => 3,
                'ship_to' => 9,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-29',
                'valid_thru' => '2022-09-09',
                'created_at' => '2022-09-18 23:25:58',
                'updated_at' => '2022-09-18 23:25:58',
            ),
            5 => 
            array (
                'id' => 8,
                'po_number' => 'BBI-7519',
                'order_id' => 13,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-09',
                'created_at' => '2022-09-19 01:33:34',
                'updated_at' => '2022-09-19 01:33:34',
            ),
            6 => 
            array (
                'id' => 9,
                'po_number' => 'KKS-EMBA04-BASSMAN',
                'order_id' => 14,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-09',
                'created_at' => '2022-09-19 02:50:15',
                'updated_at' => '2022-09-19 02:50:15',
            ),
            7 => 
            array (
                'id' => 10,
                'po_number' => 'KKS-EMBA05-UIVER',
                'order_id' => 15,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-30',
                'created_at' => '2022-09-19 03:04:50',
                'updated_at' => '2022-09-19 03:04:50',
            ),
            8 => 
            array (
                'id' => 11,
                'po_number' => 'KKS-EMBA06-STAR',
                'order_id' => 16,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-10',
                'created_at' => '2022-09-19 03:25:54',
                'updated_at' => '2022-09-19 03:25:54',
            ),
            9 => 
            array (
                'id' => 12,
                'po_number' => 'KKS-EMBA07-BS07',
                'order_id' => 17,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-17',
                'created_at' => '2022-09-20 03:31:42',
                'updated_at' => '2022-09-20 03:31:42',
            ),
        ));
        
        
    }
}