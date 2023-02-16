<?php

use Illuminate\Database\Seeder;

class BomServiceTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('bom_service')->delete();
        
        \DB::table('bom_service')->insert(array (
            0 => 
            array (
                'id' => 1,
                'bom_id' => 1,
                'product_id' => 46,
                'unit_price' => 10000.0,
            ),
            1 => 
            array (
                'id' => 3,
                'bom_id' => 3,
                'product_id' => 46,
                'unit_price' => 10000.0,
            ),
            2 => 
            array (
                'id' => 4,
                'bom_id' => 3,
                'product_id' => 47,
                'unit_price' => 1000.0,
            ),
            3 => 
            array (
                'id' => 5,
                'bom_id' => 3,
                'product_id' => 48,
                'unit_price' => 5000.0,
            ),
            4 => 
            array (
                'id' => 6,
                'bom_id' => 2,
                'product_id' => 47,
                'unit_price' => 1000.0,
            ),
            5 => 
            array (
                'id' => 7,
                'bom_id' => 2,
                'product_id' => 46,
                'unit_price' => 10000.0,
            ),
            6 => 
            array (
                'id' => 8,
                'bom_id' => 2,
                'product_id' => 48,
                'unit_price' => 5000.0,
            ),
            7 => 
            array (
                'id' => 9,
                'bom_id' => 4,
                'product_id' => 46,
                'unit_price' => 11000.0,
            ),
            8 => 
            array (
                'id' => 10,
                'bom_id' => 4,
                'product_id' => 47,
                'unit_price' => 1000.0,
            ),
            9 => 
            array (
                'id' => 11,
                'bom_id' => 32,
                'product_id' => 48,
                'unit_price' => 1000.0,
            ),
            10 => 
            array (
                'id' => 12,
                'bom_id' => 32,
                'product_id' => 47,
                'unit_price' => 1000.0,
            ),
        ));
        
        
    }
}