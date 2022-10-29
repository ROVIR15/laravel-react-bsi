<?php

use Illuminate\Database\Seeder;

class ApprovalTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('approval')->delete();
        
        \DB::table('approval')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 3,
                'name' => 'quotation',
                'submit' => 0,
                'review' => 0,
                'approve' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'user_id' => 3,
                'name' => 'sales-order',
                'submit' => 0,
                'review' => 0,
                'approve' => 1,
            ),
            2 => 
            array (
                'id' => 5,
                'user_id' => 3,
                'name' => 'purchase-order',
                'submit' => 0,
                'review' => 0,
                'approve' => 1,
            ),
            3 => 
            array (
                'id' => 6,
                'user_id' => 3,
                'name' => 'request-for-quotation',
                'submit' => 0,
                'review' => 0,
                'approve' => 1,
            ),
            4 => 
            array (
                'id' => 7,
                'user_id' => 0,
                'name' => NULL,
                'submit' => 0,
                'review' => 0,
                'approve' => 0,
            ),
            5 => 
            array (
                'id' => 9,
                'user_id' => 2,
                'name' => 'request-for-quotation',
                'submit' => 1,
                'review' => 1,
                'approve' => 1,
            ),
            6 => 
            array (
                'id' => 10,
                'user_id' => 11,
                'name' => 'request-for-quotation',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            7 => 
            array (
                'id' => 11,
                'user_id' => 11,
                'name' => 'purchase-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
        ));
        
        
    }
}