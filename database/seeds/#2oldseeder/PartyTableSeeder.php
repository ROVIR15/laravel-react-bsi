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
                'name' => 'PT Kasih Karunia Sejati',
                'email' => 'kks.emba@gmail.com',
                'npwp' => '01.300.862.8-415.000',
                'agreement_role_id' => NULL,
                'organization_party_id' => 2,
            ),
            2 => 
            array (
                'id' => 3,
                'person_party_id' => NULL,
                'name' => 'PT Apparel One Indonesia',
                'email' => 'marketing@apparel.com',
                'npwp' => '03.123.374.5-503.000',
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
            9 => 
            array (
                'id' => 10,
                'person_party_id' => NULL,
                'name' => 'PT. HARVESTINDO PURNAMATEX',
                'email' => 'irairnawati6674@gmail.com',
                'npwp' => '123412434',
                'agreement_role_id' => NULL,
                'organization_party_id' => 9,
            ),
            10 => 
            array (
                'id' => 11,
                'person_party_id' => NULL,
                'name' => 'PT. KREASI KESUKSESAN MANDIRI',
                'email' => 'ria.hendria@kreatex.co.id',
                'npwp' => '2131234',
                'agreement_role_id' => NULL,
                'organization_party_id' => 10,
            ),
            11 => 
            array (
                'id' => 12,
                'person_party_id' => NULL,
                'name' => 'CV. MULTI JAYA MANDIRI',
                'email' => 'm_j_m@cbn.net.id',
                'npwp' => '123456',
                'agreement_role_id' => NULL,
                'organization_party_id' => 11,
            ),
            12 => 
            array (
                'id' => 13,
                'person_party_id' => NULL,
                'name' => 'PT Karmel Ozora Godwin',
                'email' => 'cressida@gmail.com',
                'npwp' => '000',
                'agreement_role_id' => NULL,
                'organization_party_id' => 12,
            ),
            13 => 
            array (
                'id' => 14,
                'person_party_id' => NULL,
                'name' => 'PT.DUTA INTERLINING',
                'email' => 'nikolas@duta-interlining.com',
                'npwp' => '123456',
                'agreement_role_id' => NULL,
                'organization_party_id' => 13,
            ),
            14 => 
            array (
                'id' => 15,
                'person_party_id' => NULL,
                'name' => 'CV MITRA PLASTIK',
                'email' => 'mitra_plastik@yahoo.com',
                'npwp' => '12345',
                'agreement_role_id' => NULL,
                'organization_party_id' => 14,
            ),
            15 => 
            array (
                'id' => 16,
                'person_party_id' => NULL,
                'name' => 'PT Inti Sukses Garmindo',
                'email' => 'isg@garment.co.id',
                'npwp' => '12308013',
                'agreement_role_id' => NULL,
                'organization_party_id' => 15,
            ),
        ));
        
        
    }
}