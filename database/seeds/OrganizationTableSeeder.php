<?php

use Illuminate\Database\Seeder;

class OrganizationTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('organization')->delete();
        
        \DB::table('organization')->insert(array (
            0 => 
            array (
                'id' => 1,
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'description' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'description' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'description' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'description' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'description' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'description' => NULL,
            ),
            7 => 
            array (
                'id' => 8,
                'description' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'description' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'description' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'description' => NULL,
            ),
            11 => 
            array (
                'id' => 12,
                'description' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'description' => NULL,
            ),
            13 => 
            array (
                'id' => 14,
                'description' => NULL,
            ),
            14 => 
            array (
                'id' => 15,
                'description' => NULL,
            ),
        ));
        
        
    }
}