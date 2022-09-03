<?php

use Illuminate\Database\Seeder;

class ProductCategoryTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('product_category')->delete();
        
        \DB::table('product_category')->insert(array (
            0 => 
            array (
                'id' => 1,
                'sub_cat' => 5,
                'name' => 'Finished Goods',
            ),
            1 => 
            array (
                'id' => 2,
                'sub_cat' => 1,
                'name' => 'Raw Material',
            ),
            2 => 
            array (
                'id' => 3,
                'sub_cat' => 2,
                'name' => 'Raw Material',
            ),
            3 => 
            array (
                'id' => 4,
                'sub_cat' => 3,
                'name' => 'Raw Material',
            ),
            4 => 
            array (
                'id' => 5,
                'sub_cat' => 4,
                'name' => 'Raw Material',
            ),
            5 => 
            array (
                'id' => 6,
                'sub_cat' => 5,
                'name' => 'Assembly Material',
            ),
            6 => 
            array (
                'id' => 7,
                'sub_cat' => 6,
                'name' => 'Inventory',
            ),
            7 => 
            array (
                'id' => 8,
                'sub_cat' => 7,
                'name' => 'Inventory',
            ),
        ));
        
        
    }
}