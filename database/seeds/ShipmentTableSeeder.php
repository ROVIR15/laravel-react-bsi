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
                'imageUrl' => NULL,
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
                'imageUrl' => NULL,
                'created_at' => '2022-10-27 03:10:46',
                'updated_at' => '2022-10-27 03:10:46',
            ),
            2 => 
            array (
                'id' => 3,
                'order_id' => 21,
                'serial_number' => '83102893',
                'delivery_date' => '2022-11-12',
                'est_delivery_date' => '2022-11-11',
                'shipment_type_id' => 1,
                'comment' => 'done',
                'imageUrl' => '/shipment_receipt/Product-Diagram.png',
                'created_at' => '2022-11-12 14:23:26',
                'updated_at' => '2022-12-17 03:10:47',
            ),
            3 => 
            array (
                'id' => 4,
                'order_id' => 3,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-11-19',
                'est_delivery_date' => '2022-11-25',
                'shipment_type_id' => 1,
                'comment' => NULL,
                'imageUrl' => NULL,
                'created_at' => '2022-11-19 02:06:43',
                'updated_at' => '2022-11-19 02:06:43',
            ),
            4 => 
            array (
                'id' => 5,
                'order_id' => 4,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-11-19',
                'est_delivery_date' => '2022-12-02',
                'shipment_type_id' => 1,
                'comment' => 'kkkk',
                'imageUrl' => NULL,
                'created_at' => '2022-11-19 02:14:25',
                'updated_at' => '2022-11-19 02:14:25',
            ),
            5 => 
            array (
                'id' => 6,
                'order_id' => 32,
                'serial_number' => '2022/3091/3-XXI/PO',
                'delivery_date' => '2022-11-29',
                'est_delivery_date' => '2022-12-10',
                'shipment_type_id' => 1,
                'comment' => 'Done',
                'imageUrl' => NULL,
                'created_at' => '2022-11-29 14:04:27',
                'updated_at' => '2022-11-29 14:04:27',
            ),
            6 => 
            array (
                'id' => 7,
                'order_id' => 8,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-12-04',
                'est_delivery_date' => '2022-12-28',
                'shipment_type_id' => 2,
                'comment' => 'done',
                'imageUrl' => NULL,
                'created_at' => '2022-12-04 11:12:09',
                'updated_at' => '2022-12-04 11:12:09',
            ),
            7 => 
            array (
                'id' => 8,
                'order_id' => 21,
                'serial_number' => 'Test',
                'delivery_date' => '2022-12-16',
                'est_delivery_date' => '2022-09-28',
                'shipment_type_id' => 1,
                'comment' => 'done',
                'imageUrl' => NULL,
                'created_at' => '2022-12-16 02:58:57',
                'updated_at' => '2022-12-16 02:58:57',
            ),
            8 => 
            array (
                'id' => 9,
                'order_id' => 6,
                'serial_number' => '000123464783',
                'delivery_date' => '2022-12-17',
                'est_delivery_date' => '2022-09-03',
                'shipment_type_id' => 1,
                'comment' => 'Done',
                'imageUrl' => NULL,
                'created_at' => '2022-12-17 03:21:06',
                'updated_at' => '2022-12-17 03:21:06',
            ),
        ));
        
        
    }
}