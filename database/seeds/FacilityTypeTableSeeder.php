<?php

use Illuminate\Database\Seeder;

class FacilityTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('facility_type')->delete();
        
        \DB::table('facility_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'warehouse',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'building',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'office',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'room',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'plant',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'floor',
            ),
        ));
        
        
    }
}