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
                'name' => 'Finished Goods',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Raw Material',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Assembly Material',
            ),
        ));
        
        
    }
}