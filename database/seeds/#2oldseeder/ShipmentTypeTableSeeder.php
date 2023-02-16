<?php

use Illuminate\Database\Seeder;

class ShipmentTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('shipment_type')->delete();
        
        \DB::table('shipment_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Incoming Shipment',
                'description' => 'After sending a purchase order, products can be received either directly to stock or after some quality checks, depending on the nature of the product.',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Outbound Shipment',
            'description' => 'the process of transporting orders (i.e. finished goods that have been picked and packed into a box or poly mailer) from a merchant\'s warehouse or fulfillment center to the end customer.',
            ),
        ));
        
        
    }
}