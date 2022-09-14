<?php

use Illuminate\Database\Seeder;

class ProductHasCategoryTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('product_has_category')->delete();
        
        \DB::table('product_has_category')->insert(array (
            0 => 
            array (
                'product_id' => 2,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
            1 => 
            array (
                'product_id' => 3,
                'product_category_id' => 4,
                'product_sub_category_id' => NULL,
            ),
            2 => 
            array (
                'product_id' => 4,
                'product_category_id' => 7,
                'product_sub_category_id' => NULL,
            ),
            3 => 
            array (
                'product_id' => 5,
                'product_category_id' => 7,
                'product_sub_category_id' => NULL,
            ),
            4 => 
            array (
                'product_id' => 6,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
            5 => 
            array (
                'product_id' => 7,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
            6 => 
            array (
                'product_id' => 8,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
            7 => 
            array (
                'product_id' => 9,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
            8 => 
            array (
                'product_id' => 11,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
            9 => 
            array (
                'product_id' => 12,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
            10 => 
            array (
                'product_id' => 13,
                'product_category_id' => 4,
                'product_sub_category_id' => NULL,
            ),
            11 => 
            array (
                'product_id' => 14,
                'product_category_id' => 1,
                'product_sub_category_id' => NULL,
            ),
        ));
        
        
    }
}