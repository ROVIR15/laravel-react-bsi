<?php

use Illuminate\Database\Seeder;

class OrderItemHasProductTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('order_item_has_product')->delete();
        
        
        
    }
}