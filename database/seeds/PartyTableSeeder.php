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
            16 => 
            array (
                'id' => 17,
                'person_party_id' => NULL,
                'name' => 'Testing',
                'email' => 'ekoarianto.hde@gmail.cok',
                'npwp' => '1244323523',
                'agreement_role_id' => NULL,
                'organization_party_id' => 16,
            ),
            17 => 
            array (
                'id' => 42,
                'person_party_id' => NULL,
                'name' => 'PT Kasih Karunia Sejahterah',
                'email' => 'kksemba@gmail.com',
                'npwp' => '123942194',
                'agreement_role_id' => NULL,
                'organization_party_id' => 40,
            ),
        ));
        
        
    }
}