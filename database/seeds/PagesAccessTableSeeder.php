<?php

use Illuminate\Database\Seeder;

class PagesAccessTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('pages_access')->delete();
        
        \DB::table('pages_access')->insert(array (
            0 => 
            array (
                'id' => 1,
                'users_id' => 3,
                'pages_id' => 1,
                'name' => 'sales',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'users_id' => 3,
                'pages_id' => 6,
                'name' => 'material',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'users_id' => 3,
                'pages_id' => 4,
                'name' => 'inventory',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            3 => 
            array (
                'id' => 4,
                'users_id' => 3,
                'pages_id' => 3,
                'name' => 'production',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
        ));
        
        
    }
}