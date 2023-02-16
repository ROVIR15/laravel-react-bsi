<?php

use Illuminate\Database\Seeder;

class CompletionStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('completion_status')->delete();
        
        \DB::table('completion_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Completed',
                'description' => '',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Running',
                'description' => '',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Waiting',
                'description' => '',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'On Shipment',
                'description' => '',
            ),
        ));
        
        
    }
}