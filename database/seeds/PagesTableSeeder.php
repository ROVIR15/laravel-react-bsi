<?php

use Illuminate\Database\Seeder;

class PagesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
                
        \DB::table('pages')->insert(array (
            0 => 
            array (
                'id' => 9,
                'name' => 'operator-spreading',
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 10,
                'name' => 'operator-cutting',
                'description' => NULL,
            ),
            2 => 
            array (
                'id' => 11,
                'name' => 'operator-numbering',
                'description' => NULL,
            ),
            3 => 
            array (
                'id' => 12,
                'name' => 'operator-supermarket',
                'description' => NULL,
            ),
            4 => 
            array (
                'id' => 13,
                'name' => 'operator-sewing',
                'description' => NULL,
            ),
            5 => 
            array (
                'id' => 14,
                'name' => 'operator-qc',
                'description' => NULL,
            ),
            6 => 
            array (
                'id' => 15,
                'name' => 'operator-finished',
                'description' => NULL,
            ),
        ));
    }
}