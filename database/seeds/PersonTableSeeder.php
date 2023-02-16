<?php

use Illuminate\Database\Seeder;

class PersonTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('person')->delete();
        
        \DB::table('person')->insert(array (
            0 => 
            array (
                'id' => 1,
                'description' => '',
            ),
            1 => 
            array (
                'id' => 2,
                'description' => '',
            ),
        ));
        
        
    }
}