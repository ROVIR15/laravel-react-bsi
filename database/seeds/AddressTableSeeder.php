<?php

use Illuminate\Database\Seeder;

class AddressTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('address')->delete();
        
        \DB::table('address')->insert(array (
            0 => 
            array (
                'id' => 1,
                'party_id' => 1,
                'city' => 'Kudus',
                'province' => 'Jawa Tengah',
                'country' => 'Indonesia',
                'street' => 'Jalan MH Thamrin no 219',
                'postal_code' => 34021,
            ),
            1 => 
            array (
                'id' => 2,
                'party_id' => 2,
                'city' => 'Malang',
                'province' => 'Jawa Timur',
                'country' => 'Indonesia',
                'street' => 'Jl. Bandulan Bar. No.51, Bandulan',
                'postal_code' => 58091,
            ),
            2 => 
            array (
                'id' => 3,
                'party_id' => 3,
                'city' => 'Semarang',
                'province' => 'Jawa Tengah',
                'country' => 'Indonesia',
                'street' => 'Jl. Kawasan Industri Wijaya Kusuma, Randu Garut, Kec. Tugu',
                'postal_code' => 50181,
            ),
            3 => 
            array (
                'id' => 4,
                'party_id' => 4,
                'city' => 'Semarang',
                'province' => 'Jawa Tengah',
                'country' => 'Indonesia',
                'street' => 'Jl. Kawasan Industri Wijaya Kusuma, Randu Garut, Kec. Tugu',
                'postal_code' => 50181,
            ),
            4 => 
            array (
                'id' => 5,
                'party_id' => 5,
                'city' => 'Malang',
                'province' => 'Jawa Timur',
                'country' => 'Indonesia',
                'street' => 'Jl. Bandulan Bar. No.51, Bandulan',
                'postal_code' => 65158,
            ),
            5 => 
            array (
                'id' => 6,
                'party_id' => 6,
                'city' => 'Jakarta Utara',
                'province' => 'Jakarta',
                'country' => 'Indonesia',
                'street' => 'Jalan MH Thamrin no 92',
                'postal_code' => 92038,
            ),
            6 => 
            array (
                'id' => 7,
                'party_id' => 7,
                'city' => 'Kudus',
                'province' => 'Jawa Tengah',
                'country' => 'Indonesia',
                'street' => 'Jl. Albisindo Raya Gondosari,',
                'postal_code' => 31823,
            ),
            7 => 
            array (
                'id' => 8,
                'party_id' => 9,
                'city' => 'Jakarta Timur',
                'province' => 'DKI Jakarta',
                'country' => 'Indonesia',
                'street' => 'Jl. Pulo Buaran 2 Blok Q No 1 Kawasan Industri Pulo Gadung, Kecamatan Cakung, Kelurahan Jatinegara',
                'postal_code' => 62183,
            ),
        ));
        
        
    }
}