<?php

use Illuminate\Database\Seeder;

class FinancialAccountTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('financial_account')->delete();
        
        \DB::table('financial_account')->insert(array (
            0 => 
            array (
                'id' => 1,
                'financial_account_type_id' => 2,
                'account_name' => 'BNI - Buana Sandang Indonesia',
                'account_number' => 128301283,
            ),
        ));
        
        
    }
}