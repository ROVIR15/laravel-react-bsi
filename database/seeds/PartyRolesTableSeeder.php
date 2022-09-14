<?php

use Illuminate\Database\Seeder;

class PartyRolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('party_roles')->delete();
        
        \DB::table('party_roles')->insert(array (
            0 => 
            array (
                'id' => 1,
                'party_id' => 1,
                'relationship_id' => 1,
                'role_type_id' => 44,
            ),
            1 => 
            array (
                'id' => 2,
                'party_id' => 2,
                'relationship_id' => 1,
                'role_type_id' => 44,
            ),
            2 => 
            array (
                'id' => 3,
                'party_id' => 3,
                'relationship_id' => 1,
                'role_type_id' => 44,
            ),
            3 => 
            array (
                'id' => 4,
                'party_id' => 4,
                'relationship_id' => 2,
                'role_type_id' => 42,
            ),
            4 => 
            array (
                'id' => 5,
                'party_id' => 5,
                'relationship_id' => 2,
                'role_type_id' => 42,
            ),
            5 => 
            array (
                'id' => 6,
                'party_id' => 6,
                'relationship_id' => 2,
                'role_type_id' => 42,
            ),
            6 => 
            array (
                'id' => 7,
                'party_id' => 7,
                'relationship_id' => 1,
                'role_type_id' => 44,
            ),
            7 => 
            array (
                'id' => 8,
                'party_id' => 8,
                'relationship_id' => 3,
                'role_type_id' => 27,
            ),
            8 => 
            array (
                'id' => 9,
                'party_id' => 9,
                'relationship_id' => 1,
                'role_type_id' => 44,
            ),
        ));
        
        
    }
}