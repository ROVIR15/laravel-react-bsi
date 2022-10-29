<?php

use Illuminate\Database\Seeder;

class FacilityTargetTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('facility_target')->delete();
        
        \DB::table('facility_target')->insert(array (
            0 => 
            array (
                'id' => 1,
                'facility_id' => 7,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            1 => 
            array (
                'id' => 2,
                'facility_id' => 8,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            2 => 
            array (
                'id' => 3,
                'facility_id' => 9,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            3 => 
            array (
                'id' => 4,
                'facility_id' => 10,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            4 => 
            array (
                'id' => 5,
                'facility_id' => 11,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            5 => 
            array (
                'id' => 6,
                'facility_id' => 12,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            6 => 
            array (
                'id' => 7,
                'facility_id' => 13,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            7 => 
            array (
                'id' => 8,
                'facility_id' => 14,
                'date' => '2022-09-15',
                'target' => 200,
            ),
            8 => 
            array (
                'id' => 9,
                'facility_id' => 11,
                'date' => '2022-09-03',
                'target' => 120,
            ),
            9 => 
            array (
                'id' => 10,
                'facility_id' => 9,
                'date' => '2022-10-21',
                'target' => 120,
            ),
        ));
        
        
    }
}