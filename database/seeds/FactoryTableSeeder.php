<?php

use Illuminate\Database\Seeder;

class FactoryTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('factory')->delete();
        
        \DB::table('factory')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'PT Buana Sandang Indonesia',
                'description' => 'kkkkk',
            ),
        ));
        
        
    }
}