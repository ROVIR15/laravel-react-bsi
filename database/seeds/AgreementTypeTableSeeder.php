<?php

use Illuminate\Database\Seeder;

class AgreementTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('agreement_type')->delete();
        
        \DB::table('agreement_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Sales Agreement',
                'description' => 'legally binding contract used between a buyer and a seller to outline the terms of a transaction.',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Purchase Agreement',
                'description' => 'a binding legal contract between two parties that obligates a transaction to occur between a buyer and seller',
            ),
        ));
        
        
    }
}