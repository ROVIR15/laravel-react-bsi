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
            21 => 
            array (
                'id' => 24,
                'users_id' => 2,
                'pages_id' => 16,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            22 => 
            array (
                'id' => 25,
                'users_id' => 2,
                'pages_id' => 3,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            23 => 
            array (
                'id' => 26,
                'users_id' => 11,
                'pages_id' => 6,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            24 => 
            array (
                'id' => 27,
                'users_id' => 11,
                'pages_id' => 8,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            25 => 
            array (
                'id' => 28,
                'users_id' => 11,
                'pages_id' => 3,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            26 => 
            array (
                'id' => 29,
                'users_id' => 2,
                'pages_id' => 2,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            27 => 
            array (
                'id' => 30,
                'users_id' => 2,
                'pages_id' => 8,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            28 => 
            array (
                'id' => 31,
                'users_id' => 2,
                'pages_id' => 6,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            29 => 
            array (
                'id' => 32,
                'users_id' => 2,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            30 => 
            array (
                'id' => 33,
                'users_id' => 2,
                'pages_id' => 13,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            31 => 
            array (
                'id' => 34,
                'users_id' => 2,
                'pages_id' => 14,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            32 => 
            array (
                'id' => 35,
                'users_id' => 8,
                'pages_id' => 8,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            33 => 
            array (
                'id' => 36,
                'users_id' => 8,
                'pages_id' => 3,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            34 => 
            array (
                'id' => 37,
                'users_id' => 8,
                'pages_id' => 6,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            35 => 
            array (
                'id' => 39,
                'users_id' => 2,
                'pages_id' => 5,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            36 => 
            array (
                'id' => 40,
                'users_id' => 12,
                'pages_id' => 13,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            37 => 
            array (
                'id' => 41,
                'users_id' => 2,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            38 => 
            array (
                'id' => 42,
                'users_id' => 13,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            39 => 
            array (
                'id' => 43,
                'users_id' => 13,
                'pages_id' => 8,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            40 => 
            array (
                'id' => 46,
                'users_id' => 4,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            41 => 
            array (
                'id' => 47,
                'users_id' => 4,
                'pages_id' => 6,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            42 => 
            array (
                'id' => 48,
                'users_id' => 4,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            43 => 
            array (
                'id' => 49,
                'users_id' => 14,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            44 => 
            array (
                'id' => 50,
                'users_id' => 15,
                'pages_id' => 14,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            45 => 
            array (
                'id' => 51,
                'users_id' => 12,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            46 => 
            array (
                'id' => 53,
                'users_id' => 15,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            47 => 
            array (
                'id' => 54,
                'users_id' => 16,
                'pages_id' => 15,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            48 => 
            array (
                'id' => 55,
                'users_id' => 16,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            49 => 
            array (
                'id' => 56,
                'users_id' => 14,
                'pages_id' => 6,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            50 => 
            array (
                'id' => 57,
                'users_id' => 14,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            51 => 
            array (
                'id' => 58,
                'users_id' => 17,
                'pages_id' => 4,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            52 => 
            array (
                'id' => 59,
                'users_id' => 17,
                'pages_id' => 6,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            53 => 
            array (
                'id' => 60,
                'users_id' => 2,
                'pages_id' => 4,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            54 => 
            array (
                'id' => 61,
                'users_id' => 4,
                'pages_id' => 17,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            55 => 
            array (
                'id' => 62,
                'users_id' => 14,
                'pages_id' => 17,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            56 => 
            array (
                'id' => 63,
                'users_id' => 2,
                'pages_id' => 17,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            57 => 
            array (
                'id' => 64,
                'users_id' => 18,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            58 => 
            array (
                'id' => 65,
                'users_id' => 18,
                'pages_id' => 17,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            59 => 
            array (
                'id' => 66,
                'users_id' => 18,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            60 => 
            array (
                'id' => 67,
                'users_id' => 2,
                'pages_id' => 18,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            61 => 
            array (
                'id' => 68,
                'users_id' => 19,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            62 => 
            array (
                'id' => 69,
                'users_id' => 19,
                'pages_id' => 18,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            63 => 
            array (
                'id' => 70,
                'users_id' => 20,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            64 => 
            array (
                'id' => 71,
                'users_id' => 20,
                'pages_id' => 8,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            65 => 
            array (
                'id' => 72,
                'users_id' => 22,
                'pages_id' => 3,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            66 => 
            array (
                'id' => 73,
                'users_id' => 23,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            67 => 
            array (
                'id' => 74,
                'users_id' => 23,
                'pages_id' => 10,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            68 => 
            array (
                'id' => 76,
                'users_id' => 24,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            69 => 
            array (
                'id' => 77,
                'users_id' => 24,
                'pages_id' => 10,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            70 => 
            array (
                'id' => 78,
                'users_id' => 24,
                'pages_id' => 9,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            71 => 
            array (
                'id' => 80,
                'users_id' => 13,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            72 => 
            array (
                'id' => 82,
                'users_id' => 25,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            73 => 
            array (
                'id' => 83,
                'users_id' => 25,
                'pages_id' => 3,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            74 => 
            array (
                'id' => 84,
                'users_id' => 25,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            75 => 
            array (
                'id' => 86,
                'users_id' => 26,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            76 => 
            array (
                'id' => 87,
                'users_id' => 26,
                'pages_id' => 7,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            77 => 
            array (
                'id' => 88,
                'users_id' => 26,
                'pages_id' => 3,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            78 => 
            array (
                'id' => 90,
                'users_id' => 2,
                'pages_id' => 19,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            79 => 
            array (
                'id' => 91,
                'users_id' => 16,
                'pages_id' => 19,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
            80 => 
            array (
                'id' => 92,
                'users_id' => 8,
                'pages_id' => 1,
                'name' => NULL,
                'insert' => 1,
                'delete' => 1,
                'edit' => 1,
            ),
        ));
        
        
    }
}