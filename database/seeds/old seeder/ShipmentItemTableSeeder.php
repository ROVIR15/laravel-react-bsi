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
                'id' => 7,
                'shipment_id' => 5,
                'order_item_id' => 32,
                'qty_shipped' => 80,
            ),
            1 => 
            array (
                'id' => 8,
                'shipment_id' => 6,
                'order_item_id' => 93,
                'qty_shipped' => 100,
            ),
            2 => 
            array (
                'id' => 9,
                'shipment_id' => 6,
                'order_item_id' => 94,
                'qty_shipped' => 100,
            ),
            3 => 
            array (
                'id' => 10,
                'shipment_id' => 7,
                'order_item_id' => 94,
                'qty_shipped' => 80,
            ),
            4 => 
            array (
                'id' => 11,
                'shipment_id' => 7,
                'order_item_id' => 93,
                'qty_shipped' => 80,
            ),
            5 => 
            array (
                'id' => 12,
                'shipment_id' => 8,
                'order_item_id' => 75,
                'qty_shipped' => 10,
            ),
            6 => 
            array (
                'id' => 13,
                'shipment_id' => 8,
                'order_item_id' => 74,
                'qty_shipped' => 10,
            ),
            7 => 
            array (
                'id' => 14,
                'shipment_id' => 9,
                'order_item_id' => 119,
                'qty_shipped' => 10,
            ),
            8 => 
            array (
                'id' => 15,
                'shipment_id' => 9,
                'order_item_id' => 120,
                'qty_shipped' => 80,
            ),
            9 => 
            array (
                'id' => 16,
                'shipment_id' => 10,
                'order_item_id' => 9,
                'qty_shipped' => 300,
            ),
        ));
        
        
    }
}