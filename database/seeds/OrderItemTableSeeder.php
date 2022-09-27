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
                'product_feature_id' => NULL,
            ),
            17 => 
            array (
                'id' => 21,
                'order_id' => 7,
                'qty' => 61,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            18 => 
            array (
                'id' => 22,
                'order_id' => 7,
                'qty' => 63,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            19 => 
            array (
                'id' => 23,
                'order_id' => 7,
                'qty' => 66,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            20 => 
            array (
                'id' => 24,
                'order_id' => 7,
                'qty' => 69,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            21 => 
            array (
                'id' => 25,
                'order_id' => 7,
                'qty' => 97,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            22 => 
            array (
                'id' => 26,
                'order_id' => 7,
                'qty' => 91,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            23 => 
            array (
                'id' => 27,
                'order_id' => 7,
                'qty' => 104,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            24 => 
            array (
                'id' => 28,
                'order_id' => 7,
                'qty' => 77,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
            ),
            25 => 
            array (
                'id' => 29,
                'order_id' => 7,
                'qty' => 79,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => NULL,
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
            48 => 
            array (
                'id' => 72,
                'order_id' => 12,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-29',
                'product_feature_id' => 84,
            ),
            49 => 
            array (
                'id' => 73,
                'order_id' => 12,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-29',
                'product_feature_id' => 85,
            ),
            50 => 
            array (
                'id' => 74,
                'order_id' => 12,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-29',
                'product_feature_id' => 86,
            ),
            51 => 
            array (
                'id' => 75,
                'order_id' => 12,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-29',
                'product_feature_id' => 87,
            ),
            52 => 
            array (
                'id' => 76,
                'order_id' => 12,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-29',
                'product_feature_id' => 88,
            ),
            53 => 
            array (
                'id' => 77,
                'order_id' => 12,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-29',
                'product_feature_id' => 89,
            ),
            54 => 
            array (
                'id' => 78,
                'order_id' => 12,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-29',
                'product_feature_id' => 90,
            ),
            55 => 
            array (
                'id' => 79,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 91,
            ),
            56 => 
            array (
                'id' => 80,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 92,
            ),
            57 => 
            array (
                'id' => 81,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 93,
            ),
            58 => 
            array (
                'id' => 82,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 94,
            ),
            59 => 
            array (
                'id' => 83,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 95,
            ),
            60 => 
            array (
                'id' => 84,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 96,
            ),
            61 => 
            array (
                'id' => 85,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 97,
            ),
            62 => 
            array (
                'id' => 86,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 98,
            ),
            63 => 
            array (
                'id' => 87,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 99,
            ),
            64 => 
            array (
                'id' => 88,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 121,
            ),
            65 => 
            array (
                'id' => 89,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 122,
            ),
            66 => 
            array (
                'id' => 90,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 123,
            ),
            67 => 
            array (
                'id' => 91,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 124,
            ),
            68 => 
            array (
                'id' => 92,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 125,
            ),
            69 => 
            array (
                'id' => 93,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 126,
            ),
            70 => 
            array (
                'id' => 94,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 127,
            ),
            71 => 
            array (
                'id' => 95,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 128,
            ),
            72 => 
            array (
                'id' => 96,
                'order_id' => 16,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 129,
            ),
            73 => 
            array (
                'id' => 97,
                'order_id' => 16,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 130,
            ),
            74 => 
            array (
                'id' => 98,
                'order_id' => 16,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 131,
            ),
            75 => 
            array (
                'id' => 99,
                'order_id' => 16,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 132,
            ),
            76 => 
            array (
                'id' => 100,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 133,
            ),
            77 => 
            array (
                'id' => 101,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 134,
            ),
            78 => 
            array (
                'id' => 102,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 135,
            ),
            79 => 
            array (
                'id' => 103,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 136,
            ),
            80 => 
            array (
                'id' => 104,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 137,
            ),
            81 => 
            array (
                'id' => 105,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 138,
            ),
            82 => 
            array (
                'id' => 106,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 139,
            ),
            83 => 
            array (
                'id' => 107,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 140,
            ),
            84 => 
            array (
                'id' => 108,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 141,
            ),
            85 => 
            array (
                'id' => 109,
                'order_id' => 17,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 142,
            ),
            86 => 
            array (
                'id' => 110,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 143,
            ),
            87 => 
            array (
                'id' => 111,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 144,
            ),
            88 => 
            array (
                'id' => 112,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 145,
            ),
            89 => 
            array (
                'id' => 113,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 146,
            ),
            90 => 
            array (
                'id' => 114,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 147,
            ),
            91 => 
            array (
                'id' => 116,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 148,
            ),
            92 => 
            array (
                'id' => 117,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 149,
            ),
            93 => 
            array (
                'id' => 118,
                'order_id' => 13,
                'qty' => 100,
                'unit_price' => 26000,
                'shipment_estimated' => '2022-09-30',
                'product_feature_id' => 150,
            ),
            94 => 
            array (
                'id' => 119,
                'order_id' => 20,
                'qty' => 20,
                'unit_price' => 19820,
                'shipment_estimated' => '2022-09-08',
                'product_feature_id' => 168,
            ),
            95 => 
            array (
                'id' => 120,
                'order_id' => 20,
                'qty' => 107,
                'unit_price' => 44145,
                'shipment_estimated' => '2022-09-03',
                'product_feature_id' => 169,
            ),
        ));
        
        
    }
}