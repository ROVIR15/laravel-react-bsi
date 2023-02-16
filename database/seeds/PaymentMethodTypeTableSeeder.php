<?php

use Illuminate\Database\Seeder;

class PaymentMethodTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('payment_method_type')->delete();
        
        \DB::table('payment_method_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Bank Transfer',
                'description' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Cash',
                'description' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Check',
                'description' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Electronic',
                'description' => NULL,
            ),
        ));
        
        
    }
}