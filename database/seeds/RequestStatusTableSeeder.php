<?php

use Illuminate\Database\Seeder;

class RequestStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('request_status')->delete();
        
        
        
    }
}