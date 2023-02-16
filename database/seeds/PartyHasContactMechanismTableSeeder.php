<?php

use Illuminate\Database\Seeder;

class PartyHasContactMechanismTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('party_has_contact_mechanism')->delete();
        
        \DB::table('party_has_contact_mechanism')->insert(array (
            0 => 
            array (
                'party_id' => 42,
                'contact_mechanism_id' => 13,
            ),
            1 => 
            array (
                'party_id' => 42,
                'contact_mechanism_id' => 14,
            ),
            2 => 
            array (
                'party_id' => 42,
                'contact_mechanism_id' => 15,
            ),
        ));
        
        
    }
}