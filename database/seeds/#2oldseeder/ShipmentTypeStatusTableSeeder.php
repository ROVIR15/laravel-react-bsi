<?php

use Illuminate\Database\Seeder;

class ShipmentTypeStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('shipment_type_status')->delete();
        
        \DB::table('shipment_type_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'scheduled',
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'shipped',
                'description' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'on_going',
                'description' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'cancelled',
                'description' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'delivered',
                'description' => NULL,
            ),
        ));
        
        
    }
}