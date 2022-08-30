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
                'facility_type_id' => 1,
                'name' => 'general inventory',
            ),
            1 => 
            array (
                'facility_type_id' => 1,
            'name' => 'Warehouse (Finished Goods)',
            ),
            2 => 
            array (
                'facility_type_id' => 1,
            'name' => 'Warehouse (Raw Material)',
            ),
            3 => 
            array (
                'facility_type_id' => 1,
            'name' => 'Warehouse (WIP)',
            ),
            4 => 
            array (
                'facility_type_id' => 4,
                'name' => 'Sewing Room',
            ),
            5 => 
            array (
                'facility_type_id' => 4,
                'name' => 'Cutting Room',
            ),
        ));
        
        
    }
}