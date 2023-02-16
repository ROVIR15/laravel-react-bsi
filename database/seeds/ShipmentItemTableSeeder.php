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
            3 => 
            array (
                'id' => 4,
                'shipment_id' => 3,
                'order_item_id' => 133,
                'qty_shipped' => 1000,
            ),
            4 => 
            array (
                'id' => 5,
                'shipment_id' => 3,
                'order_item_id' => 134,
                'qty_shipped' => 1000,
            ),
            5 => 
            array (
                'id' => 6,
                'shipment_id' => 5,
                'order_item_id' => 10,
                'qty_shipped' => 200,
            ),
            6 => 
            array (
                'id' => 7,
                'shipment_id' => 5,
                'order_item_id' => 11,
                'qty_shipped' => 200,
            ),
            7 => 
            array (
                'id' => 8,
                'shipment_id' => 5,
                'order_item_id' => 12,
                'qty_shipped' => 200,
            ),
            8 => 
            array (
                'id' => 9,
                'shipment_id' => 6,
                'order_item_id' => 261,
                'qty_shipped' => 30,
            ),
            9 => 
            array (
                'id' => 10,
                'shipment_id' => 6,
                'order_item_id' => 262,
                'qty_shipped' => 50,
            ),
            10 => 
            array (
                'id' => 11,
                'shipment_id' => 7,
                'order_item_id' => 31,
                'qty_shipped' => 80,
            ),
            11 => 
            array (
                'id' => 12,
                'shipment_id' => 7,
                'order_item_id' => 32,
                'qty_shipped' => 80,
            ),
            12 => 
            array (
                'id' => 13,
                'shipment_id' => 8,
                'order_item_id' => 133,
                'qty_shipped' => 100,
            ),
            13 => 
            array (
                'id' => 14,
                'shipment_id' => 8,
                'order_item_id' => 134,
                'qty_shipped' => 100,
            ),
            14 => 
            array (
                'id' => 15,
                'shipment_id' => 9,
                'order_item_id' => 17,
                'qty_shipped' => 100,
            ),
            15 => 
            array (
                'id' => 16,
                'shipment_id' => 9,
                'order_item_id' => 18,
                'qty_shipped' => 100,
            ),
            16 => 
            array (
                'id' => 17,
                'shipment_id' => 9,
                'order_item_id' => 19,
                'qty_shipped' => 0,
            ),
        ));
        
        
    }
}