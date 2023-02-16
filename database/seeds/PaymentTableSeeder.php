<?php

use Illuminate\Database\Seeder;

class PaymentTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('payment')->delete();
        
        \DB::table('payment')->insert(array (
            0 => 
            array (
                'id' => 1,
                'payment_method_type_id' => 4,
                'invoice_id' => 15,
                'effective_date' => '2022-12-21',
                'ref_num' => '12312414344',
                'amount' => 12300000.0,
                'comment' => 'done',
                'imageUrl' => '/payment_receipt/PO Fabric 1.jpeg',
                'created_at' => '2022-12-18 14:58:51',
                'updated_at' => '2022-12-18 15:58:36',
            ),
            1 => 
            array (
                'id' => 2,
                'payment_method_type_id' => 1,
                'invoice_id' => 16,
                'effective_date' => '2022-12-20',
                'ref_num' => '6754521123',
                'amount' => 4500000.0,
                'comment' => 'Done',
                'imageUrl' => '',
                'created_at' => '2022-12-18 15:09:40',
                'updated_at' => '2022-12-18 15:09:40',
            ),
            2 => 
            array (
                'id' => 3,
                'payment_method_type_id' => 1,
                'invoice_id' => 15,
                'effective_date' => '2022-12-24',
                'ref_num' => '2134213333',
                'amount' => 4972800.0,
                'comment' => NULL,
                'imageUrl' => NULL,
                'created_at' => '2022-12-23 22:59:21',
                'updated_at' => '2022-12-23 22:59:21',
            ),
            3 => 
            array (
                'id' => 4,
                'payment_method_type_id' => 1,
                'invoice_id' => 16,
                'effective_date' => '2022-12-24',
                'ref_num' => '2134213333',
                'amount' => 8702400.0,
                'comment' => NULL,
                'imageUrl' => NULL,
                'created_at' => '2022-12-23 22:59:21',
                'updated_at' => '2022-12-23 22:59:21',
            ),
        ));
        
        
    }
}