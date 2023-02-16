<?php

use Illuminate\Database\Seeder;

class FacilityTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('facility')->delete();
        
        \DB::table('facility')->insert(array (
            0 => 
            array (
                'id' => 1,
                'facility_type_id' => 1,
                'name' => 'general inventory',
            ),
            1 => 
            array (
                'id' => 2,
                'facility_type_id' => 1,
            'name' => 'Warehouse (Finished Goods)',
            ),
            2 => 
            array (
                'id' => 3,
                'facility_type_id' => 1,
            'name' => 'Warehouse (Raw Material)',
            ),
            3 => 
            array (
                'id' => 4,
                'facility_type_id' => 1,
            'name' => 'Warehouse (WIP)',
            ),
            4 => 
            array (
                'id' => 5,
                'facility_type_id' => 4,
                'name' => 'Sewing Room',
            ),
            5 => 
            array (
                'id' => 6,
                'facility_type_id' => 4,
                'name' => 'Cutting Room',
            ),
            6 => 
            array (
                'id' => 7,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 1',
            ),
            7 => 
            array (
                'id' => 8,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 2',
            ),
            8 => 
            array (
                'id' => 9,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 3',
            ),
            9 => 
            array (
                'id' => 10,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 4',
            ),
            10 => 
            array (
                'id' => 11,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 5',
            ),
            11 => 
            array (
                'id' => 12,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 6',
            ),
            12 => 
            array (
                'id' => 13,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 7',
            ),
            13 => 
            array (
                'id' => 14,
                'facility_type_id' => 7,
                'name' => 'Sewing Line 8',
            ),
        ));
        
        
    }
}