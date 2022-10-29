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
                'shipment_id' => 8,
                'created_at' => '2022-10-26 12:28:24',
            ),
            1 => 
            array (
                'id' => 2,
                'user_id' => 2,
                'shipment_type_status_id' => 2,
                'shipment_id' => 8,
                'created_at' => '2022-10-26 12:40:52',
            ),
            2 => 
            array (
                'id' => 3,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 9,
                'created_at' => '2022-10-26 17:24:22',
            ),
            3 => 
            array (
                'id' => 4,
                'user_id' => 2,
                'shipment_type_status_id' => 5,
                'shipment_id' => 10,
                'created_at' => '2022-10-26 17:29:20',
            ),
        ));
        
        
    }
}