<?php

use Illuminate\Database\Seeder;

class FactoryHasFacilityTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('factory_has_facility')->delete();
        
        \DB::table('factory_has_facility')->insert(array (
            0 => 
            array (
                'factory_id' => 1,
                'facility_id' => 7,
            ),
            1 => 
            array (
                'factory_id' => 1,
                'facility_id' => 8,
            ),
            2 => 
            array (
                'factory_id' => 1,
                'facility_id' => 9,
            ),
            3 => 
            array (
                'factory_id' => 1,
                'facility_id' => 10,
            ),
            4 => 
            array (
                'factory_id' => 1,
                'facility_id' => 11,
            ),
            5 => 
            array (
                'factory_id' => 1,
                'facility_id' => 12,
            ),
            6 => 
            array (
                'factory_id' => 1,
                'facility_id' => 13,
            ),
            7 => 
            array (
                'factory_id' => 1,
                'facility_id' => 14,
            ),
        ));
        
        
    }
}