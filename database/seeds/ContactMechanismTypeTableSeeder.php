<?php

use Illuminate\Database\Seeder;

class ContactMechanismTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('contact_mechanism_type')->delete();
        
        \DB::table('contact_mechanism_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Phone',
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Email Address',
                'description' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Postal Address',
                'description' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Fax',
                'description' => NULL,
            ),
        ));
        
        
    }
}