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
        ));
        
        
    }
}