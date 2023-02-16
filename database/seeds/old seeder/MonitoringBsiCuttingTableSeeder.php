<?php

use Illuminate\Database\Seeder;

class MonitoringBsiCuttingTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('monitoring_bsi_cutting')->delete();
        
        \DB::table('monitoring_bsi_cutting')->insert(array (
            0 => 
            array (
                'id' => 1,
                'spread_id' => 0,
                'date' => '2022-10-19',
                'po_number' => '28cs2',
                'sales_order_id' => 6,
                'order_id' => 11,
                'order_item_id' => 63,
                'product_feature_id' => 41,
                'category_name' => NULL,
                'output' => 100,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}