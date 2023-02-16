<?php

use Illuminate\Database\Seeder;

class ShipmentStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('shipment_status')->delete();
        
        \DB::table('shipment_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 1,
                'created_at' => '2022-10-27 02:38:23',
            ),
            1 => 
            array (
                'id' => 2,
                'user_id' => 16,
                'shipment_type_status_id' => 5,
                'shipment_id' => 2,
                'created_at' => '2022-10-27 03:10:46',
            ),
            2 => 
            array (
                'id' => 3,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 3,
                'created_at' => '2022-11-12 21:23:26',
            ),
            3 => 
            array (
                'id' => 4,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 5,
                'created_at' => '2022-11-19 09:14:25',
            ),
            4 => 
            array (
                'id' => 5,
                'user_id' => 2,
                'shipment_type_status_id' => 1,
                'shipment_id' => 5,
                'created_at' => '2022-11-19 09:17:15',
            ),
            5 => 
            array (
                'id' => 6,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 6,
                'created_at' => '2022-11-29 21:04:27',
            ),
            6 => 
            array (
                'id' => 7,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 7,
                'created_at' => '2022-12-04 18:12:09',
            ),
            7 => 
            array (
                'id' => 8,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 8,
                'created_at' => '2022-12-16 09:58:57',
            ),
            8 => 
            array (
                'id' => 9,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 9,
                'created_at' => '2022-12-17 10:21:06',
            ),
        ));
        
        
    }
}