<?php

use Illuminate\Database\Seeder;

class FileUploadTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('file_upload')->delete();
        
        \DB::table('file_upload')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => '1668306854_image003.png',
                'created_at' => '2022-11-13 02:34:14',
                'updated_at' => '2022-11-13 02:34:14',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => '1668306886_S0081 - Tour Pant.png',
                'created_at' => '2022-11-13 02:34:46',
                'updated_at' => '2022-11-13 02:34:46',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => '1668307104_BBB003 - Shorts.png',
                'created_at' => '2022-11-13 02:38:24',
                'updated_at' => '2022-11-13 02:38:24',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => '1668307216_image003.png',
                'created_at' => '2022-11-13 02:40:16',
                'updated_at' => '2022-11-13 02:40:16',
            ),
            4 => 
            array (
                'id' => 5,
                'name' => '1668762313_Picture1.png',
                'created_at' => '2022-11-18 09:05:13',
                'updated_at' => '2022-11-18 09:05:13',
            ),
            5 => 
            array (
                'id' => 6,
                'name' => '1668762328_bsi_logo.jpeg',
                'created_at' => '2022-11-18 09:05:28',
                'updated_at' => '2022-11-18 09:05:28',
            ),
            6 => 
            array (
                'id' => 7,
                'name' => '1671245144_Springbox.jpeg',
                'created_at' => '2022-12-17 02:45:44',
                'updated_at' => '2022-12-17 02:45:44',
            ),
            7 => 
            array (
                'id' => 8,
                'name' => '1671246255_chart.png',
                'created_at' => '2022-12-17 03:04:15',
                'updated_at' => '2022-12-17 03:04:15',
            ),
            8 => 
            array (
                'id' => 9,
                'name' => '1671246334_Product-Diagram.png',
                'created_at' => '2022-12-17 03:05:34',
                'updated_at' => '2022-12-17 03:05:34',
            ),
            9 => 
            array (
                'id' => 10,
                'name' => '1671246428_Product-Diagram.png',
                'created_at' => '2022-12-17 03:07:08',
                'updated_at' => '2022-12-17 03:07:08',
            ),
            10 => 
            array (
                'id' => 11,
                'name' => '1671246642_Product-Diagram.png',
                'created_at' => '2022-12-17 03:10:42',
                'updated_at' => '2022-12-17 03:10:42',
            ),
            11 => 
            array (
                'id' => 12,
                'name' => '1671247237_bsi_logo.jpeg',
                'created_at' => '2022-12-17 03:20:38',
                'updated_at' => '2022-12-17 03:20:38',
            ),
            12 => 
            array (
                'id' => 13,
                'name' => '1671378821_PO Fabric 2.jpeg',
                'created_at' => '2022-12-18 15:53:41',
                'updated_at' => '2022-12-18 15:53:41',
            ),
            13 => 
            array (
                'id' => 14,
                'name' => '1671379090_PO Fabric 1.jpeg',
                'created_at' => '2022-12-18 15:58:10',
                'updated_at' => '2022-12-18 15:58:10',
            ),
        ));
        
        
    }
}