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
                'id' => 5,
                'order_id' => 8,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-10-26',
                'est_delivery_date' => '2022-10-29',
                'shipment_type_id' => 2,
                'comment' => 'Nothing',
                'created_at' => '2022-10-26 04:18:53',
                'updated_at' => '2022-10-26 04:18:53',
            ),
            1 => 
            array (
                'id' => 6,
                'order_id' => 15,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-10-26',
                'est_delivery_date' => '2022-10-27',
                'shipment_type_id' => 2,
                'comment' => 'nonon',
                'created_at' => '2022-10-26 05:24:38',
                'updated_at' => '2022-10-26 05:24:38',
            ),
            2 => 
            array (
                'id' => 7,
                'order_id' => 15,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-10-26',
                'est_delivery_date' => '2022-10-31',
                'shipment_type_id' => 2,
                'comment' => 'hahah',
                'created_at' => '2022-10-26 05:27:17',
                'updated_at' => '2022-10-26 05:27:17',
            ),
            3 => 
            array (
                'id' => 8,
                'order_id' => 12,
                'serial_number' => '2022/3091/3-jqwlejw',
                'delivery_date' => '2022-10-26',
                'est_delivery_date' => '2022-10-28',
                'shipment_type_id' => 2,
                'comment' => 'haha',
                'created_at' => '2022-10-26 05:28:24',
                'updated_at' => '2022-10-26 05:28:24',
            ),
            4 => 
            array (
                'id' => 9,
                'order_id' => 20,
                'serial_number' => '2022/3091/3-jqwlejw/PO',
                'delivery_date' => '2022-10-26',
                'est_delivery_date' => '2022-10-28',
                'shipment_type_id' => 1,
                'comment' => 'waiting for check',
                'created_at' => '2022-10-26 10:24:22',
                'updated_at' => '2022-10-26 10:24:22',
            ),
            5 => 
            array (
                'id' => 10,
                'order_id' => 3,
                'serial_number' => '2022/3091/3-jqwlejw/PO',
                'delivery_date' => '2022-10-26',
                'est_delivery_date' => '2022-10-27',
                'shipment_type_id' => 1,
                'comment' => 'sdfsfds',
                'created_at' => '2022-10-26 10:29:20',
                'updated_at' => '2022-10-26 10:29:20',
            ),
        ));
        
        
    }
}