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
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            2 => 
            array (
                'id' => 5,
                'user_id' => 3,
                'name' => 'purchase-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
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
                'review' => 0,
                'approve' => 0,
            ),
            6 => 
            array (
                'id' => 10,
                'user_id' => 11,
                'name' => 'request-for-quotation',
                'submit' => 1,
                'review' => 1,
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
            8 => 
            array (
                'id' => 12,
                'user_id' => 13,
                'name' => 'quotation',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            9 => 
            array (
                'id' => 13,
                'user_id' => 13,
                'name' => 'request-for-quotation',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            10 => 
            array (
                'id' => 15,
                'user_id' => 8,
                'name' => 'sales-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            11 => 
            array (
                'id' => 16,
                'user_id' => 2,
                'name' => 'bom',
                'submit' => 1,
                'review' => 1,
                'approve' => 0,
            ),
            12 => 
            array (
                'id' => 17,
                'user_id' => 13,
                'name' => 'sales-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            13 => 
            array (
                'id' => 18,
                'user_id' => 13,
                'name' => 'purchase-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            14 => 
            array (
                'id' => 19,
                'user_id' => 3,
                'name' => 'bom',
                'submit' => 0,
                'review' => 1,
                'approve' => 1,
            ),
            15 => 
            array (
                'id' => 20,
                'user_id' => 2,
                'name' => 'purchase-order',
                'submit' => 1,
                'review' => 1,
                'approve' => 0,
            ),
            16 => 
            array (
                'id' => 21,
                'user_id' => 2,
                'name' => 'sales-order',
                'submit' => 1,
                'review' => 1,
                'approve' => 0,
            ),
            17 => 
            array (
                'id' => 22,
                'user_id' => 6,
                'name' => 'sales-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            18 => 
            array (
                'id' => 23,
                'user_id' => 14,
                'name' => 'sales-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            19 => 
            array (
                'id' => 27,
                'user_id' => 22,
                'name' => 'bom',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            20 => 
            array (
                'id' => 28,
                'user_id' => 25,
                'name' => 'bom',
                'submit' => 0,
                'review' => 1,
                'approve' => 0,
            ),
            21 => 
            array (
                'id' => 29,
                'user_id' => 25,
                'name' => 'sales-order',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
            22 => 
            array (
                'id' => 30,
                'user_id' => 8,
                'name' => 'bom',
                'submit' => 1,
                'review' => 0,
                'approve' => 0,
            ),
        ));
        
        
    }
}