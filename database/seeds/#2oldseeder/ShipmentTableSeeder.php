<?php

use Illuminate\Database\Seeder;

class ShipmentTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('shipment')->delete();
        
        \DB::table('shipment')->insert(array (
            0 => 
            array (
                'id' => 1,
                'order_id' => 8,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-10-27',
                'est_delivery_date' => '2022-10-29',
                'shipment_type_id' => 2,
                'comment' => 'nothingss',
                'created_at' => '2022-10-27 02:38:23',
                'updated_at' => '2022-10-27 02:38:23',
            ),
            1 => 
            array (
                'id' => 2,
                'order_id' => 7,
                'serial_number' => '1C370',
                'delivery_date' => '2022-10-26',
                'est_delivery_date' => '2022-10-28',
                'shipment_type_id' => 2,
                'comment' => 'tanpa catatan',
                'created_at' => '2022-10-27 03:10:46',
                'updated_at' => '2022-10-27 03:10:46',
            ),
        ));
        
        
    }
}