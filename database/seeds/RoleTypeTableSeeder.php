<?php

use Illuminate\Database\Seeder;

class RoleTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('role_type')->delete();
        
        \DB::table('role_type')->insert(array (
            0 => 
            array (
                'id' => 26,
                'role' => 'Employee',
                'name' => 'Admin Cutting',
            ),
            1 => 
            array (
                'id' => 27,
                'role' => 'Employee',
                'name' => 'Admin Finishing',
            ),
            2 => 
            array (
                'id' => 28,
                'role' => 'Employee',
                'name' => 'Admin Gudang',
            ),
            3 => 
            array (
                'id' => 29,
                'role' => 'Employee',
                'name' => 'Admin Mekanik',
            ),
            4 => 
            array (
                'id' => 30,
                'role' => 'Employee',
                'name' => 'Admin Produksi',
            ),
            5 => 
            array (
                'id' => 31,
                'role' => 'Employee',
                'name' => 'Admin PPIC',
            ),
            6 => 
            array (
                'id' => 32,
                'role' => 'Employee',
                'name' => 'SPV',
            ),
            7 => 
            array (
                'id' => 33,
                'role' => 'Employee',
                'name' => 'Operator',
            ),
            8 => 
            array (
                'id' => 34,
                'role' => 'Employee',
                'name' => 'PU',
            ),
            9 => 
            array (
                'id' => 35,
                'role' => 'Employee',
                'name' => 'Training',
            ),
            10 => 
            array (
                'id' => 36,
                'role' => 'Employee',
                'name' => 'Driver',
            ),
            11 => 
            array (
                'id' => 37,
                'role' => 'Employee',
                'name' => 'IE',
            ),
            12 => 
            array (
                'id' => 38,
                'role' => 'Employee',
                'name' => 'Leader',
            ),
            13 => 
            array (
                'id' => 39,
                'role' => 'Employee',
                'name' => 'Helper',
            ),
            14 => 
            array (
                'id' => 40,
                'role' => 'Employee',
                'name' => 'Purchasing',
            ),
            15 => 
            array (
                'id' => 41,
                'role' => 'Vendor',
                'name' => 'Person',
            ),
            16 => 
            array (
                'id' => 42,
                'role' => 'Vendor',
                'name' => 'Organization',
            ),
            17 => 
            array (
                'id' => 43,
                'role' => 'Buyer',
                'name' => 'Person',
            ),
            18 => 
            array (
                'id' => 44,
                'role' => 'Buyer',
                'name' => 'Organization',
            ),
            19 => 
            array (
                'id' => 45,
                'role' => 'Employee',
                'name' => 'Admin',
            ),
            20 => 
            array (
                'id' => 46,
                'role' => 'Employee',
                'name' => 'Admin Sewing',
            ),
            21 => 
            array (
                'id' => 47,
                'role' => 'Employee',
                'name' => 'Admin Cutting',
            ),
            22 => 
            array (
                'id' => 48,
                'role' => 'Employee',
                'name' => 'Admin Finishing',
            ),
            23 => 
            array (
                'id' => 49,
                'role' => 'Employee',
                'name' => 'Admin Gudang',
            ),
            24 => 
            array (
                'id' => 50,
                'role' => 'Employee',
                'name' => 'Admin Mekanik',
            ),
            25 => 
            array (
                'id' => 51,
                'role' => 'Employee',
                'name' => 'Admin Produksi',
            ),
            26 => 
            array (
                'id' => 52,
                'role' => 'Employee',
                'name' => 'Admin PPIC',
            ),
            27 => 
            array (
                'id' => 53,
                'role' => 'Employee',
                'name' => 'SPV',
            ),
            28 => 
            array (
                'id' => 54,
                'role' => 'Employee',
                'name' => 'Operator',
            ),
            29 => 
            array (
                'id' => 55,
                'role' => 'Employee',
                'name' => 'PU',
            ),
            30 => 
            array (
                'id' => 56,
                'role' => 'Employee',
                'name' => 'Training',
            ),
            31 => 
            array (
                'id' => 57,
                'role' => 'Employee',
                'name' => 'Driver',
            ),
            32 => 
            array (
                'id' => 58,
                'role' => 'Employee',
                'name' => 'IE',
            ),
            33 => 
            array (
                'id' => 59,
                'role' => 'Employee',
                'name' => 'Leader',
            ),
            34 => 
            array (
                'id' => 60,
                'role' => 'Employee',
                'name' => 'Helper',
            ),
            35 => 
            array (
                'id' => 61,
                'role' => 'Employee',
                'name' => 'Purchasing',
            ),
        ));
        
        
    }
}