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
            4 => 
            array (
                'id' => 5,
                'users_id' => 3,
                'pages_id' => 7,
                'name' => 'monitoring',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            5 => 
            array (
                'id' => 6,
                'users_id' => 3,
                'pages_id' => 8,
                'name' => 'purchasing',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            6 => 
            array (
                'id' => 7,
                'users_id' => 3,
                'pages_id' => 2,
                'name' => 'human_resources',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            7 => 
            array (
                'id' => 8,
                'users_id' => 6,
                'pages_id' => 1,
                'name' => 'sales',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            8 => 
            array (
                'id' => 9,
                'users_id' => 6,
                'pages_id' => 6,
                'name' => 'material',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            9 => 
            array (
                'id' => 10,
                'users_id' => 6,
                'pages_id' => 4,
                'name' => 'inventory',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            10 => 
            array (
                'id' => 11,
                'users_id' => 6,
                'pages_id' => 3,
                'name' => 'production',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            11 => 
            array (
                'id' => 12,
                'users_id' => 6,
                'pages_id' => 7,
                'name' => 'monitoring',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            12 => 
            array (
                'id' => 13,
                'users_id' => 6,
                'pages_id' => 8,
                'name' => 'purchasing',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            13 => 
            array (
                'id' => 14,
                'users_id' => 6,
                'pages_id' => 2,
                'name' => 'human_resources',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            14 => 
            array (
                'id' => 15,
                'users_id' => 7,
                'pages_id' => 9,
                'name' => 'operator-spreading',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            15 => 
            array (
                'id' => 16,
                'users_id' => 7,
                'pages_id' => 10,
                'name' => 'operator-cutting',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            16 => 
            array (
                'id' => 17,
                'users_id' => 7,
                'pages_id' => 11,
                'name' => 'operator-numbering',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            17 => 
            array (
                'id' => 18,
                'users_id' => 7,
                'pages_id' => 12,
                'name' => 'operator-supermarket',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            18 => 
            array (
                'id' => 19,
                'users_id' => 7,
                'pages_id' => 13,
                'name' => 'operator-sewing',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            19 => 
            array (
                'id' => 20,
                'users_id' => 7,
                'pages_id' => 14,
                'name' => 'operator-qc',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            20 => 
            array (
                'id' => 21,
                'users_id' => 7,
                'pages_id' => 15,
                'name' => 'operator-finished',
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
        ));
        
        
    }
}