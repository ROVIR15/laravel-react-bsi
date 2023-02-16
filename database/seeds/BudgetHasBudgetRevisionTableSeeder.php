<?php

use Illuminate\Database\Seeder;

class BudgetHasBudgetRevisionTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('budget_has_budget_revision')->delete();
        
        
        
    }
}