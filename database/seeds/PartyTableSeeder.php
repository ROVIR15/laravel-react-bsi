<?php

use Illuminate\Database\Seeder;

class PartyTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('party')->delete();
        
        \DB::table('party')->insert(array (
            0 => 
            array (
                'id' => 1,
                'person_party_id' => NULL,
                'name' => 'PT Harus Dua Empat',
                'email' => 'pt.hde@gmail.com',
                'npwp' => '21380124',
                'agreement_role_id' => NULL,
                'organization_party_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'person_party_id' => NULL,
                'name' => 'PT Kasih Karunia Sejahtera',
                'email' => 'kks.emba@gmail.com',
                'npwp' => '310489212',
                'agreement_role_id' => NULL,
                'organization_party_id' => 2,
            ),
            2 => 
            array (
                'id' => 3,
                'person_party_id' => NULL,
                'name' => 'PT. BBI Semarang',
                'email' => 'marketing@apparel.com',
                'npwp' => '71239718',
                'agreement_role_id' => NULL,
                'organization_party_id' => 3,
            ),
            3 => 
            array (
                'id' => 4,
                'person_party_id' => NULL,
                'name' => 'PT BBI Semarang',
                'email' => 'pt.bbi@apparel.com',
                'npwp' => '20938102',
                'agreement_role_id' => NULL,
                'organization_party_id' => 4,
            ),
            4 => 
            array (
                'id' => 5,
                'person_party_id' => NULL,
                'name' => 'PT Kasih Karunia Sejati',
                'email' => 'kks@emba.com',
                'npwp' => '7928431',
                'agreement_role_id' => NULL,
                'organization_party_id' => 5,
            ),
            5 => 
            array (
                'id' => 6,
                'person_party_id' => NULL,
                'name' => 'PT Harus Dua Empat',
                'email' => 'marketing@hde.com',
                'npwp' => '18230284',
                'agreement_role_id' => NULL,
                'organization_party_id' => 6,
            ),
            6 => 
            array (
                'id' => 7,
                'person_party_id' => NULL,
                'name' => 'PT Buana Sandang Indonesia',
                'email' => 'bsi@garment.com',
                'npwp' => '2739127',
                'agreement_role_id' => NULL,
                'organization_party_id' => 7,
            ),
            7 => 
            array (
                'id' => 8,
                'person_party_id' => 1,
                'name' => 'Lisa',
                'email' => 'admin@bsi.com',
                'npwp' => '0',
                'agreement_role_id' => NULL,
                'organization_party_id' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'person_party_id' => NULL,
                'name' => 'PT. BBI Jakarta',
                'email' => 'bbijakarta@gmail.com',
                'npwp' => '879324792',
                'agreement_role_id' => NULL,
                'organization_party_id' => 8,
            ),
        ));
        
        
    }
}