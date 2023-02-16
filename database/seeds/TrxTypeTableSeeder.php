<?php

use Illuminate\Database\Seeder;

class TrxTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('trx_type')->delete();
        
        \DB::table('trx_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Withdrawal',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Deposit',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Adjustment',
            ),
        ));
        
        
    }
}