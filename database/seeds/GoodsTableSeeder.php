<?php

use Illuminate\Database\Seeder;

class GoodsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('goods')->delete();
        
        \DB::table('goods')->insert(array (
            0 => 
            array (
                'id' => 2,
                'name' => 'Javier',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'Emba',
                'imageUrl' => NULL,
                'created_at' => '2022-09-03 16:40:49',
                'updated_at' => '2022-09-03 16:40:49',
            ),
            1 => 
            array (
                'id' => 3,
                'name' => 'Kain Chinos',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => 'Emba',
                'imageUrl' => NULL,
                'created_at' => '2022-09-03 16:41:33',
                'updated_at' => '2022-09-03 16:41:45',
            ),
            2 => 
            array (
                'id' => 4,
                'name' => 'Mesin Obras Benang 1',
                'satuan' => 'pcs',
                'value' => 1000,
                'brand' => '1',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 01:53:08',
                'updated_at' => '2022-09-08 01:53:08',
            ),
            3 => 
            array (
                'id' => 5,
                'name' => 'Obras',
                'satuan' => 'pcs',
                'value' => 123130,
                'brand' => 'JUKI',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 01:53:39',
                'updated_at' => '2022-09-08 01:53:39',
            ),
            4 => 
            array (
                'id' => 6,
                'name' => 'Obras Benang',
                'satuan' => 'pcs',
                'value' => 10000,
                'brand' => 'JUKI',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 01:54:06',
                'updated_at' => '2022-09-08 01:54:06',
            ),
            5 => 
            array (
                'id' => 7,
                'name' => 'Jasper',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 11:38:47',
                'updated_at' => '2022-09-08 11:38:47',
            ),
            6 => 
            array (
                'id' => 8,
                'name' => 'NUXVER',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 11:40:28',
                'updated_at' => '2022-09-08 11:40:28',
            ),
            7 => 
            array (
                'id' => 9,
                'name' => 'BS. 08',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 11:43:24',
                'updated_at' => '2022-09-08 11:43:24',
            ),
            8 => 
            array (
                'id' => 10,
                'name' => 'T797',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'SHCC',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 11:48:25',
                'updated_at' => '2022-09-08 11:48:25',
            ),
            9 => 
            array (
                'id' => 12,
                'name' => 'J918',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'SHCC',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 11:53:19',
                'updated_at' => '2022-09-13 02:34:07',
            ),
            10 => 
            array (
                'id' => 13,
                'name' => '7519',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'SHCC',
                'imageUrl' => '/data_file/7519.jpeg',
                'created_at' => '2022-09-13 02:33:03',
                'updated_at' => '2022-09-13 02:33:03',
            ),
            11 => 
            array (
                'id' => 14,
                'name' => 'CP-044',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-13 02:45:08',
                'updated_at' => '2022-09-13 02:45:08',
            ),
            12 => 
            array (
                'id' => 15,
                'name' => 'JASPER',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'SHCC',
                'imageUrl' => NULL,
                'created_at' => '2022-09-13 04:02:20',
                'updated_at' => '2022-09-13 04:02:20',
            ),
        ));
        
        
    }
}