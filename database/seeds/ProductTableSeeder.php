<?php

use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('product')->delete();
        
        \DB::table('product')->insert(array (
            0 => 
            array (
                'id' => 2,
                'goods_id' => 2,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            1 => 
            array (
                'id' => 3,
                'goods_id' => 3,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            2 => 
            array (
                'id' => 4,
                'goods_id' => 5,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            3 => 
            array (
                'id' => 5,
                'goods_id' => 6,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            4 => 
            array (
                'id' => 6,
                'goods_id' => 7,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            5 => 
            array (
                'id' => 7,
                'goods_id' => 8,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            6 => 
            array (
                'id' => 8,
                'goods_id' => 9,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            7 => 
            array (
                'id' => 9,
                'goods_id' => 10,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            8 => 
            array (
                'id' => 11,
                'goods_id' => 12,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            9 => 
            array (
                'id' => 12,
                'goods_id' => 13,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            10 => 
            array (
                'id' => 13,
                'goods_id' => 14,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
            11 => 
            array (
                'id' => 14,
                'goods_id' => 15,
                'part_id' => NULL,
                'service_id' => NULL,
            ),
        ));
        
        
    }
}