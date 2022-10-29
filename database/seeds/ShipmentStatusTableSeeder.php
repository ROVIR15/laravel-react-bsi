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
        ));
        
        
    }
}