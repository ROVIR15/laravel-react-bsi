<?php

use Illuminate\Database\Seeder;

class InvoiceHasShipmentTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('invoice_has_shipment')->delete();
        
        
        
    }
}