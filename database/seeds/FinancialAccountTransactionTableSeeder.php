<?php

use Illuminate\Database\Seeder;

class FinancialAccountTransactionTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('financial_account_transaction')->delete();
        
        \DB::table('financial_account_transaction')->insert(array (
            0 => 
            array (
                'id' => 10,
                'financial_account_id' => 1,
                'payment_id' => NULL,
                'ref_num' => '2134213333',
                'trx_date' => '2022-12-24',
                'trx_type_id' => 2,
                'trx_amount' => 13675200.0,
                'created_at' => '2022-12-25 11:33:00',
                'updated_at' => '2022-12-25 11:33:00',
            ),
            1 => 
            array (
                'id' => 11,
                'financial_account_id' => 1,
                'payment_id' => NULL,
                'ref_num' => '12312414344',
                'trx_date' => '2022-12-21',
                'trx_type_id' => 2,
                'trx_amount' => 12300000.0,
                'created_at' => '2022-12-25 11:33:00',
                'updated_at' => '2022-12-25 11:33:00',
            ),
        ));
        
        
    }
}