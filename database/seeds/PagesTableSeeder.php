<?php

use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('pages')->delete();
        
        \DB::table('pages')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'sales',
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'human_resources',
                'description' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'production',
                'description' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'inventory',
                'description' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'industrial_engineering',
                'description' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'material',
                'description' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'monitoring',
                'description' => 'this page for monitoring',
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'purchasing',
                'description' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'operator-spreading',
                'description' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'operator-cutting',
                'description' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'operator-numbering',
                'description' => NULL,
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'operator-supermarket',
                'description' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'name' => 'operator-sewing',
                'description' => NULL,
            ),
            13 => 
            array (
                'id' => 14,
                'name' => 'operator-qc',
                'description' => NULL,
            ),
            14 => 
            array (
                'id' => 15,
                'name' => 'operator-finished',
                'description' => NULL,
            ),
            15 => 
            array (
                'id' => 16,
                'name' => 'user-management',
                'description' => NULL,
            ),
            16 => 
            array (
                'id' => 17,
                'name' => 'work-center',
                'description' => NULL,
            ),
            17 => 
            array (
                'id' => 18,
                'name' => 'facility',
                'description' => NULL,
            ),
            18 => 
            array (
                'id' => 19,
                'name' => 'shipment',
                'description' => NULL,
            ),
            19 => 
            array (
                'id' => 20,
                'name' => 'pages',
                'description' => NULL,
            ),
            20 => 
            array (
                'id' => 21,
                'name' => 'factory',
                'description' => NULL,
            ),
            21 => 
            array (
                'id' => 23,
                'name' => 'finance',
                'description' => 'hahaha',
            ),
        ));
        
        
    }
}