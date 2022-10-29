<?php

use Illuminate\Database\Seeder;

class StatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('status')->delete();
        
        \DB::table('status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Buyer',
                'description' => 'It\'s buyer either organization or personal',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Supplier',
                'description' => 'It\'s either organisation or personal who acted as supplier for company',
            ),
        ));
        
        
    }
}