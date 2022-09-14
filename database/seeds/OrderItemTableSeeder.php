<?php

use Illuminate\Database\Seeder;

class OrderItemTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('order_item')->delete();
        
        \DB::table('order_item')->insert(array (
            0 => 
            array (
                'id' => 4,
                'order_id' => 2,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-08-29',
                'product_feature_id' => 15,
            ),
            1 => 
            array (
                'id' => 5,
                'order_id' => 2,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-08-29',
                'product_feature_id' => 16,
            ),
            2 => 
            array (
                'id' => 6,
                'order_id' => 2,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-08-29',
                'product_feature_id' => 17,
            ),
            3 => 
            array (
                'id' => 7,
                'order_id' => 3,
                'qty' => 300,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-02',
                'product_feature_id' => 15,
            ),
            4 => 
            array (
                'id' => 8,
                'order_id' => 3,
                'qty' => 300,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-02',
                'product_feature_id' => 16,
            ),
            5 => 
            array (
                'id' => 9,
                'order_id' => 3,
                'qty' => 300,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-02',
                'product_feature_id' => 17,
            ),
            6 => 
            array (
                'id' => 10,
                'order_id' => 4,
                'qty' => 600,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-06',
                'product_feature_id' => 15,
            ),
            7 => 
            array (
                'id' => 11,
                'order_id' => 4,
                'qty' => 600,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-06',
                'product_feature_id' => 16,
            ),
            8 => 
            array (
                'id' => 12,
                'order_id' => 4,
                'qty' => 600,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-06',
                'product_feature_id' => 17,
            ),
            9 => 
            array (
                'id' => 13,
                'order_id' => 5,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-09-15',
                'product_feature_id' => 9,
            ),
            10 => 
            array (
                'id' => 14,
                'order_id' => 5,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-09-15',
                'product_feature_id' => 11,
            ),
            11 => 
            array (
                'id' => 15,
                'order_id' => 5,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-09-15',
                'product_feature_id' => 12,
            ),
            12 => 
            array (
                'id' => 16,
                'order_id' => 5,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-09-15',
                'product_feature_id' => 10,
            ),
            13 => 
            array (
                'id' => 17,
                'order_id' => 6,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-09-15',
                'product_feature_id' => 15,
            ),
            14 => 
            array (
                'id' => 18,
                'order_id' => 6,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-09-16',
                'product_feature_id' => 16,
            ),
            15 => 
            array (
                'id' => 19,
                'order_id' => 6,
                'qty' => 100,
                'unit_price' => 2000,
                'shipment_estimated' => '2022-09-17',
                'product_feature_id' => 17,
            ),
            16 => 
            array (
                'id' => 20,
                'order_id' => 7,
                'qty' => 61,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 18,
            ),
            17 => 
            array (
                'id' => 21,
                'order_id' => 7,
                'qty' => 61,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 19,
            ),
            18 => 
            array (
                'id' => 22,
                'order_id' => 7,
                'qty' => 63,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 20,
            ),
            19 => 
            array (
                'id' => 23,
                'order_id' => 7,
                'qty' => 66,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 21,
            ),
            20 => 
            array (
                'id' => 24,
                'order_id' => 7,
                'qty' => 69,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 22,
            ),
            21 => 
            array (
                'id' => 25,
                'order_id' => 7,
                'qty' => 97,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 23,
            ),
            22 => 
            array (
                'id' => 26,
                'order_id' => 7,
                'qty' => 91,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 24,
            ),
            23 => 
            array (
                'id' => 27,
                'order_id' => 7,
                'qty' => 104,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 25,
            ),
            24 => 
            array (
                'id' => 28,
                'order_id' => 7,
                'qty' => 77,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 26,
            ),
            25 => 
            array (
                'id' => 29,
                'order_id' => 7,
                'qty' => 79,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 27,
            ),
            26 => 
            array (
                'id' => 30,
                'order_id' => 8,
                'qty' => 116,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 28,
            ),
            27 => 
            array (
                'id' => 31,
                'order_id' => 8,
                'qty' => 87,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 29,
            ),
            28 => 
            array (
                'id' => 32,
                'order_id' => 8,
                'qty' => 87,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 30,
            ),
            29 => 
            array (
                'id' => 33,
                'order_id' => 8,
                'qty' => 232,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 31,
            ),
            30 => 
            array (
                'id' => 34,
                'order_id' => 8,
                'qty' => 174,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 32,
            ),
            31 => 
            array (
                'id' => 35,
                'order_id' => 8,
                'qty' => 174,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 33,
            ),
            32 => 
            array (
                'id' => 36,
                'order_id' => 8,
                'qty' => 232,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 34,
            ),
            33 => 
            array (
                'id' => 37,
                'order_id' => 8,
                'qty' => 174,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 35,
            ),
            34 => 
            array (
                'id' => 38,
                'order_id' => 8,
                'qty' => 174,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 36,
            ),
            35 => 
            array (
                'id' => 39,
                'order_id' => 8,
                'qty' => 116,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 37,
            ),
            36 => 
            array (
                'id' => 40,
                'order_id' => 8,
                'qty' => 87,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 38,
            ),
            37 => 
            array (
                'id' => 41,
                'order_id' => 8,
                'qty' => 87,
                'unit_price' => 28000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 39,
            ),
            38 => 
            array (
                'id' => 62,
                'order_id' => 11,
                'qty' => 77,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 40,
            ),
            39 => 
            array (
                'id' => 63,
                'order_id' => 11,
                'qty' => 77,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 41,
            ),
            40 => 
            array (
                'id' => 64,
                'order_id' => 11,
                'qty' => 154,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 42,
            ),
            41 => 
            array (
                'id' => 65,
                'order_id' => 11,
                'qty' => 154,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 43,
            ),
            42 => 
            array (
                'id' => 66,
                'order_id' => 11,
                'qty' => 231,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 44,
            ),
            43 => 
            array (
                'id' => 67,
                'order_id' => 11,
                'qty' => 231,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 45,
            ),
            44 => 
            array (
                'id' => 68,
                'order_id' => 11,
                'qty' => 309,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 46,
            ),
            45 => 
            array (
                'id' => 69,
                'order_id' => 11,
                'qty' => 309,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 47,
            ),
            46 => 
            array (
                'id' => 70,
                'order_id' => 11,
                'qty' => 154,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 48,
            ),
            47 => 
            array (
                'id' => 71,
                'order_id' => 11,
                'qty' => 154,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-23',
                'product_feature_id' => 49,
            ),
        ));
        
        
    }
}