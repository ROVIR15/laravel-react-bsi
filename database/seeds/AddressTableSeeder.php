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
                'street' => 'Jl. Bandulan Barat No.17',
                'postal_code' => 65146,
            ),
            2 => 
            array (
                'id' => 3,
                'party_id' => 3,
                'city' => 'Semarang',
                'province' => 'Jawa Tengah',
                'country' => 'Indonesia',
                'street' => 'Kawasan Industri Wijaya Kusuma Jl. Tugu Wijaya IV, Kel. Randu Garut, Kec. Tugu, Kab. Semarang',
                'postal_code' => 50156,
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
            8 => 
            array (
                'id' => 9,
                'party_id' => 10,
                'city' => 'Cianjur',
                'province' => 'Jawa Barat',
                'country' => 'Indonesia',
                'street' => 'JL. Raya Bandung Kp. Mekarsari RT/RW 003/008 Desa Babakancaringin Karangtengah',
                'postal_code' => 43281,
            ),
            9 => 
            array (
                'id' => 10,
                'party_id' => 11,
                'city' => 'Jakarta Timur',
                'province' => 'DKI Jakarta',
                'country' => 'Indonesia',
                'street' => 'Rukan Avenue No. 8-068 Jakarta Garden City',
                'postal_code' => 13910,
            ),
            10 => 
            array (
                'id' => 11,
                'party_id' => 12,
                'city' => 'Bandung',
                'province' => 'Jawa barat',
                'country' => 'Indonesia',
                'street' => 'Jl. Istana Sukajadi B-15 RT/RW 009/002 Pasteur Sukajadi Kota Bandung Jawa Barat',
                'postal_code' => 40161,
            ),
            11 => 
            array (
                'id' => 12,
                'party_id' => 13,
                'city' => 'Jakarta',
                'province' => 'Jakarta Barat',
                'country' => 'Indonesia',
                'street' => 'Ruko Citra Niaga Blok A No. 9 Pegadungan Kalideres',
                'postal_code' => 10000,
            ),
            12 => 
            array (
                'id' => 13,
                'party_id' => 14,
                'city' => 'JAKARTA',
                'province' => 'DKI JAKARTA',
                'country' => 'INDONESIA',
                'street' => 'Pusat Perdagangan Grosir Tekstile, Ruko Tekstil Jl. Mangga dua Raya Blok D2 No.21 Jakarta 14430',
                'postal_code' => 14430,
            ),
            13 => 
            array (
                'id' => 14,
                'party_id' => 15,
                'city' => 'BANDUNG',
                'province' => 'JAWA BARAT',
                'country' => 'INDONESIA',
                'street' => 'JL MUARA RAYA NO 35 BANDUNG 40243, PELINDUNG HEWAN',
                'postal_code' => 40243,
            ),
            14 => 
            array (
                'id' => 15,
                'party_id' => 16,
                'city' => 'Semarang',
                'province' => 'Jawa Tengah',
                'country' => 'Indonesia',
                'street' => 'Jalan Soekarno Hatta KM. 31, Kel. Randugunting, Kec. Bergas',
                'postal_code' => 50661,
            ),
        ));
        
        
    }
}