<?php

use Illuminate\Database\Seeder;

class ServiceTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('service')->delete();
        
        \DB::table('service')->insert(array (
            0 => 
            array (
                'id' => 7,
                'name' => 'Marketing Cost',
                'created_at' => '2022-09-22 04:56:04',
                'updated_at' => '2022-09-23 06:16:12',
            ),
            1 => 
            array (
                'id' => 8,
                'name' => 'Trucking',
                'created_at' => '2022-09-23 06:41:31',
                'updated_at' => '2022-09-23 06:41:31',
            ),
            2 => 
            array (
                'id' => 9,
                'name' => 'Washing',
                'created_at' => '2022-09-23 06:42:02',
                'updated_at' => '2022-09-23 06:42:02',
            ),
        ));
        
        
    }
}