<?php

use Illuminate\Database\Seeder;

class OrderCompletionStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('order_completion_status')->delete();
        
        \DB::table('order_completion_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'order_id' => 23,
                'completion_status_id' => 2,
                'user_id' => 2,
                'created_at' => '2022-11-06 02:36:04',
                'updated_at' => '2022-11-06 02:36:04',
            ),
            1 => 
            array (
                'id' => 2,
                'order_id' => 45,
                'completion_status_id' => 2,
                'user_id' => 2,
                'created_at' => '2022-11-06 02:37:30',
                'updated_at' => '2022-11-06 02:37:30',
            ),
            2 => 
            array (
                'id' => 3,
                'order_id' => 27,
                'completion_status_id' => 2,
                'user_id' => 2,
                'created_at' => '2022-11-06 02:37:56',
                'updated_at' => '2022-11-06 02:37:56',
            ),
            3 => 
            array (
                'id' => 4,
                'order_id' => 27,
                'completion_status_id' => 2,
                'user_id' => 2,
                'created_at' => '2022-11-06 02:38:31',
                'updated_at' => '2022-11-06 02:38:31',
            ),
            4 => 
            array (
                'id' => 5,
                'order_id' => 23,
                'completion_status_id' => 1,
                'user_id' => 2,
                'created_at' => '2022-12-05 07:19:21',
                'updated_at' => '2022-12-05 07:19:21',
            ),
        ));
        
        
    }
}