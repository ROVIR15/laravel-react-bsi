<?php

use Illuminate\Database\Seeder;

class BomStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('bom_status')->delete();
        
        \DB::table('bom_status')->insert(array (
            0 => 
            array (
                'id' => 6,
                'user_id' => 2,
                'bom_id' => 2,
                'status_type' => 'Approve',
                'description' => NULL,
                'created_at' => '2022-10-04 16:20:03',
                'updated_at' => '2022-10-04 16:20:03',
            ),
            1 => 
            array (
                'id' => 7,
                'user_id' => 3,
                'bom_id' => 3,
                'status_type' => 'Approve',
                'description' => NULL,
                'created_at' => '2022-10-04 17:36:09',
                'updated_at' => '2022-10-04 17:36:09',
            ),
            2 => 
            array (
                'id' => 8,
                'user_id' => 2,
                'bom_id' => 2,
                'status_type' => 'Approve',
                'description' => NULL,
                'created_at' => '2022-10-14 04:24:21',
                'updated_at' => '2022-10-14 04:24:21',
            ),
            3 => 
            array (
                'id' => 9,
                'user_id' => 6,
                'bom_id' => 6,
                'status_type' => 'Submit',
                'description' => NULL,
                'created_at' => '2022-10-23 02:53:58',
                'updated_at' => '2022-10-23 02:53:58',
            ),
            4 => 
            array (
                'id' => 10,
                'user_id' => 6,
                'bom_id' => 6,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 02:56:33',
                'updated_at' => '2022-10-23 02:56:33',
            ),
            5 => 
            array (
                'id' => 11,
                'user_id' => 6,
                'bom_id' => 6,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 02:58:13',
                'updated_at' => '2022-10-23 02:58:13',
            ),
            6 => 
            array (
                'id' => 12,
                'user_id' => 6,
                'bom_id' => 6,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 02:59:29',
                'updated_at' => '2022-10-23 02:59:29',
            ),
            7 => 
            array (
                'id' => 13,
                'user_id' => 6,
                'bom_id' => 6,
                'status_type' => 'Approve',
                'description' => NULL,
                'created_at' => '2022-10-23 02:59:41',
                'updated_at' => '2022-10-23 02:59:41',
            ),
            8 => 
            array (
                'id' => 14,
                'user_id' => 7,
                'bom_id' => 7,
                'status_type' => 'Submit',
                'description' => NULL,
                'created_at' => '2022-10-23 03:02:35',
                'updated_at' => '2022-10-23 03:02:35',
            ),
            9 => 
            array (
                'id' => 15,
                'user_id' => 7,
                'bom_id' => 7,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:05:14',
                'updated_at' => '2022-10-23 03:05:14',
            ),
            10 => 
            array (
                'id' => 16,
                'user_id' => 7,
                'bom_id' => 7,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:05:32',
                'updated_at' => '2022-10-23 03:05:32',
            ),
            11 => 
            array (
                'id' => 17,
                'user_id' => 7,
                'bom_id' => 7,
                'status_type' => 'Approve',
                'description' => NULL,
                'created_at' => '2022-10-23 03:06:11',
                'updated_at' => '2022-10-23 03:06:11',
            ),
            12 => 
            array (
                'id' => 18,
                'user_id' => 5,
                'bom_id' => 5,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:16:50',
                'updated_at' => '2022-10-23 03:16:50',
            ),
            13 => 
            array (
                'id' => 19,
                'user_id' => 5,
                'bom_id' => 5,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:26:51',
                'updated_at' => '2022-10-23 03:26:51',
            ),
            14 => 
            array (
                'id' => 20,
                'user_id' => 5,
                'bom_id' => 5,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:29:58',
                'updated_at' => '2022-10-23 03:29:58',
            ),
            15 => 
            array (
                'id' => 21,
                'user_id' => 5,
                'bom_id' => 5,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:30:55',
                'updated_at' => '2022-10-23 03:30:55',
            ),
            16 => 
            array (
                'id' => 22,
                'user_id' => 5,
                'bom_id' => 5,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:34:48',
                'updated_at' => '2022-10-23 03:34:48',
            ),
            17 => 
            array (
                'id' => 23,
                'user_id' => 3,
                'bom_id' => 5,
                'status_type' => 'Review',
                'description' => NULL,
                'created_at' => '2022-10-23 03:36:58',
                'updated_at' => '2022-10-23 03:36:58',
            ),
            18 => 
            array (
                'id' => 24,
                'user_id' => 3,
                'bom_id' => 5,
                'status_type' => 'Approve',
                'description' => NULL,
                'created_at' => '2022-10-23 03:37:26',
                'updated_at' => '2022-10-23 03:37:26',
            ),
        ));
        
        
    }
}