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
                'id' => 8,
                'name' => 'NUXVER',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-08 11:40:28',
                'updated_at' => '2022-09-08 11:40:28',
            ),
            6 => 
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
            7 => 
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
            8 => 
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
            9 => 
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
            10 => 
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
            11 => 
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
            12 => 
            array (
                'id' => 16,
                'name' => 'CP-044',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'Test',
                'imageUrl' => NULL,
                'created_at' => '2022-09-16 02:43:47',
                'updated_at' => '2022-09-16 02:43:47',
            ),
            13 => 
            array (
                'id' => 17,
                'name' => 'VIRS 13715 NF',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => 'VRS',
                'imageUrl' => NULL,
                'created_at' => '2022-09-16 02:52:35',
                'updated_at' => '2022-09-16 02:52:35',
            ),
            14 => 
            array (
                'id' => 18,
                'name' => 'Interlining',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-16 02:54:15',
                'updated_at' => '2022-09-16 02:54:15',
            ),
            15 => 
            array (
                'id' => 19,
                'name' => 'Thread 60/2',
                'satuan' => 'cones',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-16 02:54:59',
                'updated_at' => '2022-09-16 02:54:59',
            ),
            16 => 
            array (
                'id' => 20,
                'name' => 'Plastic Button 16L/4H',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-16 02:56:14',
                'updated_at' => '2022-09-16 02:56:14',
            ),
            17 => 
            array (
                'id' => 21,
                'name' => 'BASSMAN',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-19 02:39:00',
                'updated_at' => '2022-09-19 02:39:00',
            ),
            18 => 
            array (
                'id' => 22,
                'name' => 'UIVER',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-19 03:03:04',
                'updated_at' => '2022-09-19 03:03:04',
            ),
            19 => 
            array (
                'id' => 23,
                'name' => 'STAR',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-19 03:24:04',
                'updated_at' => '2022-09-19 03:24:04',
            ),
            20 => 
            array (
                'id' => 24,
                'name' => 'BS07',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => 'EMBA',
                'imageUrl' => NULL,
                'created_at' => '2022-09-20 03:27:13',
                'updated_at' => '2022-09-20 03:27:13',
            ),
            21 => 
            array (
                'id' => 25,
                'name' => 'TIGER',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => 'KREATEX',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:30:35',
                'updated_at' => '2022-09-21 11:30:35',
            ),
            22 => 
            array (
                'id' => 26,
                'name' => 'Interlining',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:31:04',
                'updated_at' => '2022-09-21 11:31:04',
            ),
            23 => 
            array (
                'id' => 27,
                'name' => 'Thread 40/2',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:31:23',
                'updated_at' => '2022-09-21 11:31:23',
            ),
            24 => 
            array (
                'id' => 28,
                'name' => 'Button 18L/4H',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:32:00',
                'updated_at' => '2022-09-21 11:32:00',
            ),
            25 => 
            array (
                'id' => 29,
                'name' => 'MAIN LABEL/SIZE LABEL',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:32:30',
                'updated_at' => '2022-09-21 11:32:30',
            ),
            26 => 
            array (
                'id' => 30,
                'name' => 'SLIP LABEL',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:32:50',
                'updated_at' => '2022-09-21 11:32:50',
            ),
            27 => 
            array (
                'id' => 31,
                'name' => 'ID LABEL',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:33:13',
                'updated_at' => '2022-09-21 11:33:13',
            ),
            28 => 
            array (
                'id' => 32,
                'name' => 'CARE LABEL',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:33:29',
                'updated_at' => '2022-09-21 11:33:29',
            ),
            29 => 
            array (
                'id' => 33,
                'name' => 'HANGTAG',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:34:02',
                'updated_at' => '2022-09-21 11:34:02',
            ),
            30 => 
            array (
                'id' => 34,
                'name' => 'ADD TAG',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:34:20',
                'updated_at' => '2022-09-21 11:34:20',
            ),
            31 => 
            array (
                'id' => 35,
                'name' => 'POLYBAG INDIVIDUAL',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:34:38',
                'updated_at' => '2022-09-21 11:34:38',
            ),
            32 => 
            array (
                'id' => 36,
                'name' => 'CARTON BOX',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:34:59',
                'updated_at' => '2022-09-21 11:34:59',
            ),
            33 => 
            array (
                'id' => 37,
                'name' => 'Carton Seal / Tag',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:36:10',
                'updated_at' => '2022-09-21 11:36:10',
            ),
            34 => 
            array (
                'id' => 38,
                'name' => 'Menshirt Style 6',
                'satuan' => 'pcs',
                'value' => 0,
                'brand' => '3second',
                'imageUrl' => NULL,
                'created_at' => '2022-09-21 11:37:25',
                'updated_at' => '2022-09-21 11:37:25',
            ),
            35 => 
            array (
                'id' => 39,
                'name' => 'LION',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-23 07:31:05',
                'updated_at' => '2022-09-23 07:31:05',
            ),
            36 => 
            array (
                'id' => 40,
                'name' => 'TC POLOS',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-23 07:39:47',
                'updated_at' => '2022-09-23 07:39:47',
            ),
            37 => 
            array (
                'id' => 41,
                'name' => 'EMBROIDERY',
                'satuan' => 'yards',
                'value' => 0,
                'brand' => '-',
                'imageUrl' => NULL,
                'created_at' => '2022-09-23 07:40:19',
                'updated_at' => '2022-09-23 07:40:19',
            ),
        ));
        
        
    }
}