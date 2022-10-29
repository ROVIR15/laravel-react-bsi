<?php

use Illuminate\Database\Seeder;

class ShipmentItemTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('shipment_item')->delete();
        
        \DB::table('shipment_item')->insert(array (
            0 => 
            array (
                'id' => 1,
                'shipment_id' => 1,
                'order_item_id' => 32,
                'qty_shipped' => 80,
            ),
            1 => 
            array (
                'id' => 2,
                'shipment_id' => 1,
                'order_item_id' => 33,
                'qty_shipped' => 200,
            ),
            2 => 
            array (
                'id' => 3,
                'shipment_id' => 2,
                'order_item_id' => 20,
                'qty_shipped' => 51,
            ),
        ));
        
        
    }
}