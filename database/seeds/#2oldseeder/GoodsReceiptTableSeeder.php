<?php

use Illuminate\Database\Seeder;

class GoodsReceiptTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('goods_receipt')->delete();
        
        \DB::table('goods_receipt')->insert(array (
            0 => 
            array (
                'id' => 1,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-15 05:24:00',
                'updated_at' => '2022-10-15 05:24:00',
            ),
            1 => 
            array (
                'id' => 2,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-15 05:34:10',
                'updated_at' => '2022-10-15 05:34:10',
            ),
            2 => 
            array (
                'id' => 3,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 2,
                'created_at' => '2022-10-15 05:36:11',
                'updated_at' => '2022-10-15 05:36:11',
            ),
            3 => 
            array (
                'id' => 4,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-15 05:41:09',
                'updated_at' => '2022-10-15 05:41:09',
            ),
            4 => 
            array (
                'id' => 5,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-17 05:46:13',
                'updated_at' => '2022-10-17 05:46:13',
            ),
            5 => 
            array (
                'id' => 6,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:05:38',
                'updated_at' => '2022-10-20 06:05:38',
            ),
            6 => 
            array (
                'id' => 7,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:12:36',
                'updated_at' => '2022-10-20 06:12:36',
            ),
            7 => 
            array (
                'id' => 8,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:19:14',
                'updated_at' => '2022-10-20 06:19:14',
            ),
            8 => 
            array (
                'id' => 9,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:19:43',
                'updated_at' => '2022-10-20 06:19:43',
            ),
            9 => 
            array (
                'id' => 10,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:19:57',
                'updated_at' => '2022-10-20 06:19:57',
            ),
            10 => 
            array (
                'id' => 11,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:20:08',
                'updated_at' => '2022-10-20 06:20:08',
            ),
            11 => 
            array (
                'id' => 12,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:20:13',
                'updated_at' => '2022-10-20 06:20:13',
            ),
            12 => 
            array (
                'id' => 13,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:31:31',
                'updated_at' => '2022-10-20 06:31:31',
            ),
            13 => 
            array (
                'id' => 14,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-20 06:50:48',
                'updated_at' => '2022-10-20 06:50:48',
            ),
            14 => 
            array (
                'id' => 15,
                'party_id' => 3,
                'purchase_order_id' => NULL,
                'facility_id' => 3,
                'created_at' => '2022-10-24 06:29:49',
                'updated_at' => '2022-10-24 06:29:49',
            ),
        ));
        
        
    }
}