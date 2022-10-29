<?php

use Illuminate\Database\Seeder;

class RelationshipTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('relationship')->delete();
        
        \DB::table('relationship')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Buyer',
                'description' => 'a person who makes a order to a company.',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Vendor',
                'description' => 'a person / organisation make offer to company',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Employee',
                'description' => '',
            ),
        ));
        
        
    }
}