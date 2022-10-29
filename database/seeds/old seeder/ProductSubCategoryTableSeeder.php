<?php

use Illuminate\Database\Seeder;

class ProductSubCategoryTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('product_sub_category')->delete();
        
        \DB::table('product_sub_category')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'benang',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'accessoris',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'fabric',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'packing',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => ' ',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Mesin',
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Komputer',
            ),
        ));
        
        
    }
}