<?php

use Illuminate\Database\Seeder;

class GoodsReceiptItemsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('goods_receipt_items')->delete();
        
        \DB::table('goods_receipt_items')->insert(array (
            0 => 
            array (
                'id' => 1,
                'goods_receipt_id' => 3,
                'product_feature_id' => 17,
                'order_item_id' => NULL,
                'order_item_order_id' => NULL,
                'qty_received' => 90,
                'qty_on_receipt' => 90,
                'created_at' => '2022-10-15 05:36:11',
                'updated_at' => '2022-10-15 05:36:11',
            ),
            1 => 
            array (
                'id' => 2,
                'goods_receipt_id' => 3,
                'product_feature_id' => 16,
                'order_item_id' => NULL,
                'order_item_order_id' => NULL,
                'qty_received' => 80,
                'qty_on_receipt' => 90,
                'created_at' => '2022-10-15 05:36:11',
                'updated_at' => '2022-10-15 05:36:11',
            ),
            2 => 
            array (
                'id' => 3,
                'goods_receipt_id' => 3,
                'product_feature_id' => 15,
                'order_item_id' => NULL,
                'order_item_order_id' => NULL,
                'qty_received' => 80,
                'qty_on_receipt' => 80,
                'created_at' => '2022-10-15 05:36:11',
                'updated_at' => '2022-10-15 05:36:11',
            ),
        ));
        
        
    }
}