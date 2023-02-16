<?php

use Illuminate\Database\Seeder;

class FinancialAccountTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('financial_account_type')->delete();
        
        \DB::table('financial_account_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Investment Account',
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Bank Account',
                'description' => NULL,
            ),
        ));
        
        
    }
}