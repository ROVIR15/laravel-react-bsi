<?php

use Illuminate\Database\Seeder;

class OperationTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('operation')->delete();
        
        \DB::table('operation')->insert(array (
            0 => 
            array (
                'id' => 3,
                'name' => 'BIENSI-STYLE6-LINE',
                'seq' => 0,
                'work_center_id' => 3,
                'bom_id' => 3,
                'created_at' => '2022-09-23 04:21:26',
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 5,
                'name' => 'BIENSI-STYLE3-LINE',
                'seq' => 0,
                'work_center_id' => 4,
                'bom_id' => 2,
                'created_at' => '2022-09-27 01:13:46',
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}