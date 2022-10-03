<?php

use Illuminate\Database\Seeder;

class BomComponentTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('bom_component')->delete();
        
        \DB::table('bom_component')->insert(array (
            0 => 
            array (
                'id' => 1,
                'bom_id' => 3,
                'product_feature_id' => 151,
                'qty' => 1.32,
                'consumption' => 1.32,
                'allowance' => 0.0,
                'unit_price' => 51000.0,
                'created_at' => NULL,
                'updated_at' => '2022-09-27 07:25:50',
            ),
            1 => 
            array (
                'id' => 2,
                'bom_id' => 3,
                'product_feature_id' => 152,
                'qty' => 0.2302,
                'consumption' => 0.2132,
                'allowance' => 0.0107,
                'unit_price' => 9500.0,
                'created_at' => NULL,
                'updated_at' => '2022-09-23 07:09:17',
            ),
            2 => 
            array (
                'id' => 3,
                'bom_id' => 3,
                'product_feature_id' => 153,
                'qty' => 0.0525,
                'consumption' => 0.05,
                'allowance' => 0.0025,
                'unit_price' => 14000.0,
                'created_at' => NULL,
                'updated_at' => '2022-09-23 06:57:56',
            ),
            3 => 
            array (
                'id' => 4,
                'bom_id' => 3,
                'product_feature_id' => 154,
                'qty' => 6.3,
                'consumption' => 6.0,
                'allowance' => 0.3,
                'unit_price' => 300.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'bom_id' => 3,
                'product_feature_id' => 155,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 800.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'bom_id' => 3,
                'product_feature_id' => 156,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 250.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'bom_id' => 3,
                'product_feature_id' => 158,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 600.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 8,
                'bom_id' => 3,
                'product_feature_id' => 159,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 1800.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'bom_id' => 3,
                'product_feature_id' => 160,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 200.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'bom_id' => 3,
                'product_feature_id' => 161,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 700.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'bom_id' => 3,
                'product_feature_id' => 162,
                'qty' => 0.042,
                'consumption' => 0.04,
                'allowance' => 0.002,
                'unit_price' => 25000.0,
                'created_at' => NULL,
                'updated_at' => '2022-09-23 07:26:59',
            ),
            11 => 
            array (
                'id' => 12,
                'bom_id' => 3,
                'product_feature_id' => 163,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 500.0,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'bom_id' => 2,
                'product_feature_id' => 165,
                'qty' => 1.35,
                'consumption' => 1.35,
                'allowance' => 0.0,
                'unit_price' => 44800.0,
                'created_at' => '2022-09-27 00:20:04',
                'updated_at' => '2022-09-27 01:15:38',
            ),
            13 => 
            array (
                'id' => 14,
                'bom_id' => 2,
                'product_feature_id' => 152,
                'qty' => 0.224,
                'consumption' => 0.2132,
                'allowance' => 0.011,
                'unit_price' => 9500.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 07:32:16',
            ),
            14 => 
            array (
                'id' => 15,
                'bom_id' => 2,
                'product_feature_id' => 153,
                'qty' => 0.0525,
                'consumption' => 0.05,
                'allowance' => 0.0025,
                'unit_price' => 14000.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:08',
            ),
            15 => 
            array (
                'id' => 16,
                'bom_id' => 2,
                'product_feature_id' => 154,
                'qty' => 6.3,
                'consumption' => 6.0,
                'allowance' => 0.3,
                'unit_price' => 300.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:13',
            ),
            16 => 
            array (
                'id' => 17,
                'bom_id' => 2,
                'product_feature_id' => 155,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 800.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:20',
            ),
            17 => 
            array (
                'id' => 18,
                'bom_id' => 2,
                'product_feature_id' => 156,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 250.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:23',
            ),
            18 => 
            array (
                'id' => 19,
                'bom_id' => 2,
                'product_feature_id' => 158,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 600.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:27',
            ),
            19 => 
            array (
                'id' => 20,
                'bom_id' => 2,
                'product_feature_id' => 159,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 1800.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:30',
            ),
            20 => 
            array (
                'id' => 21,
                'bom_id' => 2,
                'product_feature_id' => 160,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 200.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:33',
            ),
            21 => 
            array (
                'id' => 22,
                'bom_id' => 2,
                'product_feature_id' => 161,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 700.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:37',
            ),
            22 => 
            array (
                'id' => 23,
                'bom_id' => 2,
                'product_feature_id' => 162,
                'qty' => 0.042,
                'consumption' => 0.04,
                'allowance' => 0.002,
                'unit_price' => 25000.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:45',
            ),
            23 => 
            array (
                'id' => 24,
                'bom_id' => 2,
                'product_feature_id' => 163,
                'qty' => 1.05,
                'consumption' => 1.0,
                'allowance' => 0.05,
                'unit_price' => 500.0,
                'created_at' => '2022-09-27 01:04:05',
                'updated_at' => '2022-09-27 01:16:48',
            ),
        ));
        
        
    }
}