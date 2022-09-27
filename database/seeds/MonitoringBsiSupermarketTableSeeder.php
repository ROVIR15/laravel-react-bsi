<?php

use Illuminate\Database\Seeder;

class MonitoringBsiSupermarketTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('monitoring_bsi_supermarket')->delete();
        
        \DB::table('monitoring_bsi_supermarket')->insert(array (
            0 => 
            array (
                'id' => 1,
                'numbering_id' => 0,
                'date' => '2022-09-17',
                'po_number' => '2C044',
                'sales_order_id' => 9,
                'order_id' => 14,
                'order_item_id' => 88,
                'product_feature_id' => 121,
                'line' => 1,
                'qty' => 152,
                'numbering' => '152',
            ),
            1 => 
            array (
                'id' => 4,
                'numbering_id' => 0,
                'date' => '2022-09-17',
                'po_number' => '1C007',
                'sales_order_id' => 12,
                'order_id' => 17,
                'order_item_id' => 106,
                'product_feature_id' => 139,
                'line' => 5,
                'qty' => 280,
                'numbering' => '280',
            ),
            2 => 
            array (
                'id' => 5,
                'numbering_id' => 0,
                'date' => '2022-09-17',
                'po_number' => '1C007',
                'sales_order_id' => 12,
                'order_id' => 17,
                'order_item_id' => 108,
                'product_feature_id' => 141,
                'line' => 5,
                'qty' => 29,
                'numbering' => '29',
            ),
            3 => 
            array (
                'id' => 6,
                'numbering_id' => 0,
                'date' => '2022-09-17',
                'po_number' => '1C007',
                'sales_order_id' => 12,
                'order_id' => 17,
                'order_item_id' => 109,
                'product_feature_id' => 142,
                'line' => 5,
                'qty' => 29,
                'numbering' => '29',
            ),
        ));
        
        
    }
}