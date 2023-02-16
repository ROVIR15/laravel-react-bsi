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
                'product_feature_id' => 103,
            ),
            17 => 
            array (
                'id' => 21,
                'order_id' => 7,
                'qty' => 61,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 104,
            ),
            18 => 
            array (
                'id' => 22,
                'order_id' => 7,
                'qty' => 63,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 105,
            ),
            19 => 
            array (
                'id' => 23,
                'order_id' => 7,
                'qty' => 66,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 106,
            ),
            20 => 
            array (
                'id' => 24,
                'order_id' => 7,
                'qty' => 69,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 107,
            ),
            21 => 
            array (
                'id' => 25,
                'order_id' => 7,
                'qty' => 97,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 108,
            ),
            22 => 
            array (
                'id' => 26,
                'order_id' => 7,
                'qty' => 91,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 109,
            ),
            23 => 
            array (
                'id' => 27,
                'order_id' => 7,
                'qty' => 104,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 110,
            ),
            24 => 
            array (
                'id' => 28,
                'order_id' => 7,
                'qty' => 77,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 111,
            ),
            25 => 
            array (
                'id' => 29,
                'order_id' => 7,
                'qty' => 79,
                'unit_price' => 23000,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 112,
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
            96 => 
            array (
                'id' => 121,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 170,
            ),
            97 => 
            array (
                'id' => 122,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 171,
            ),
            98 => 
            array (
                'id' => 123,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 172,
            ),
            99 => 
            array (
                'id' => 124,
                'order_id' => 14,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 173,
            ),
            100 => 
            array (
                'id' => 125,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 174,
            ),
            101 => 
            array (
                'id' => 126,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 175,
            ),
            102 => 
            array (
                'id' => 127,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 176,
            ),
            103 => 
            array (
                'id' => 128,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 177,
            ),
            104 => 
            array (
                'id' => 129,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 178,
            ),
            105 => 
            array (
                'id' => 130,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 179,
            ),
            106 => 
            array (
                'id' => 131,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 180,
            ),
            107 => 
            array (
                'id' => 132,
                'order_id' => 15,
                'qty' => 100,
                'unit_price' => 29000,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 181,
            ),
            108 => 
            array (
                'id' => 133,
                'order_id' => 21,
                'qty' => 4611,
                'unit_price' => 44800,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 165,
            ),
            109 => 
            array (
                'id' => 134,
                'order_id' => 21,
                'qty' => 4611,
                'unit_price' => 44800,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 166,
            ),
            110 => 
            array (
                'id' => 135,
                'order_id' => 21,
                'qty' => 4611,
                'unit_price' => 44800,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 167,
            ),
            111 => 
            array (
                'id' => 136,
                'order_id' => 22,
                'qty' => 50,
                'unit_price' => 12265,
                'shipment_estimated' => '2022-10-05',
                'product_feature_id' => 187,
            ),
            112 => 
            array (
                'id' => 137,
                'order_id' => 22,
                'qty' => 67,
                'unit_price' => 12265,
                'shipment_estimated' => '2022-10-05',
                'product_feature_id' => 189,
            ),
            113 => 
            array (
                'id' => 138,
                'order_id' => 23,
                'qty' => 83,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 231,
            ),
            114 => 
            array (
                'id' => 139,
                'order_id' => 23,
                'qty' => 166,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 232,
            ),
            115 => 
            array (
                'id' => 140,
                'order_id' => 23,
                'qty' => 166,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 233,
            ),
            116 => 
            array (
                'id' => 141,
                'order_id' => 23,
                'qty' => 166,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 234,
            ),
            117 => 
            array (
                'id' => 142,
                'order_id' => 23,
                'qty' => 83,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 235,
            ),
            118 => 
            array (
                'id' => 143,
                'order_id' => 23,
                'qty' => 83,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 236,
            ),
            119 => 
            array (
                'id' => 144,
                'order_id' => 23,
                'qty' => 83,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 237,
            ),
            120 => 
            array (
                'id' => 145,
                'order_id' => 23,
                'qty' => 40,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 238,
            ),
            121 => 
            array (
                'id' => 146,
                'order_id' => 23,
                'qty' => 40,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 239,
            ),
            122 => 
            array (
                'id' => 147,
                'order_id' => 23,
                'qty' => 40,
                'unit_price' => 37000,
                'shipment_estimated' => '2022-10-18',
                'product_feature_id' => 240,
            ),
            123 => 
            array (
                'id' => 148,
                'order_id' => 24,
                'qty' => 83,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 223,
            ),
            124 => 
            array (
                'id' => 149,
                'order_id' => 24,
                'qty' => 185,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 224,
            ),
            125 => 
            array (
                'id' => 150,
                'order_id' => 24,
                'qty' => 185,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 225,
            ),
            126 => 
            array (
                'id' => 151,
                'order_id' => 24,
                'qty' => 180,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 226,
            ),
            127 => 
            array (
                'id' => 152,
                'order_id' => 24,
                'qty' => 98,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 227,
            ),
            128 => 
            array (
                'id' => 153,
                'order_id' => 24,
                'qty' => 98,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 228,
            ),
            129 => 
            array (
                'id' => 154,
                'order_id' => 24,
                'qty' => 93,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 229,
            ),
            130 => 
            array (
                'id' => 155,
                'order_id' => 24,
                'qty' => 5,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-25',
                'product_feature_id' => 230,
            ),
            131 => 
            array (
                'id' => 156,
                'order_id' => 25,
                'qty' => 63,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 203,
            ),
            132 => 
            array (
                'id' => 157,
                'order_id' => 25,
                'qty' => 43,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 204,
            ),
            133 => 
            array (
                'id' => 158,
                'order_id' => 25,
                'qty' => 63,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 205,
            ),
            134 => 
            array (
                'id' => 159,
                'order_id' => 25,
                'qty' => 43,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 206,
            ),
            135 => 
            array (
                'id' => 160,
                'order_id' => 25,
                'qty' => 100,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 207,
            ),
            136 => 
            array (
                'id' => 161,
                'order_id' => 25,
                'qty' => 60,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 208,
            ),
            137 => 
            array (
                'id' => 162,
                'order_id' => 25,
                'qty' => 100,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 209,
            ),
            138 => 
            array (
                'id' => 163,
                'order_id' => 25,
                'qty' => 60,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 210,
            ),
            139 => 
            array (
                'id' => 164,
                'order_id' => 25,
                'qty' => 137,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 211,
            ),
            140 => 
            array (
                'id' => 165,
                'order_id' => 25,
                'qty' => 77,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 212,
            ),
            141 => 
            array (
                'id' => 166,
                'order_id' => 25,
                'qty' => 137,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 213,
            ),
            142 => 
            array (
                'id' => 167,
                'order_id' => 25,
                'qty' => 77,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 214,
            ),
            143 => 
            array (
                'id' => 168,
                'order_id' => 25,
                'qty' => 136,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 215,
            ),
            144 => 
            array (
                'id' => 169,
                'order_id' => 25,
                'qty' => 79,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 216,
            ),
            145 => 
            array (
                'id' => 170,
                'order_id' => 25,
                'qty' => 136,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 217,
            ),
            146 => 
            array (
                'id' => 171,
                'order_id' => 25,
                'qty' => 79,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 218,
            ),
            147 => 
            array (
                'id' => 172,
                'order_id' => 25,
                'qty' => 68,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 219,
            ),
            148 => 
            array (
                'id' => 173,
                'order_id' => 25,
                'qty' => 39,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 220,
            ),
            149 => 
            array (
                'id' => 174,
                'order_id' => 25,
                'qty' => 68,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 221,
            ),
            150 => 
            array (
                'id' => 175,
                'order_id' => 25,
                'qty' => 39,
                'unit_price' => 32000,
                'shipment_estimated' => '2022-10-26',
                'product_feature_id' => 222,
            ),
            151 => 
            array (
                'id' => 176,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 195,
            ),
            152 => 
            array (
                'id' => 177,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 196,
            ),
            153 => 
            array (
                'id' => 178,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 197,
            ),
            154 => 
            array (
                'id' => 179,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 198,
            ),
            155 => 
            array (
                'id' => 180,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 199,
            ),
            156 => 
            array (
                'id' => 181,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 200,
            ),
            157 => 
            array (
                'id' => 182,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 201,
            ),
            158 => 
            array (
                'id' => 183,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-10-15',
                'product_feature_id' => 202,
            ),
            159 => 
            array (
                'id' => 184,
                'order_id' => 27,
                'qty' => 716,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 256,
            ),
            160 => 
            array (
                'id' => 185,
                'order_id' => 27,
                'qty' => 546,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 257,
            ),
            161 => 
            array (
                'id' => 186,
                'order_id' => 27,
                'qty' => 352,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 258,
            ),
            162 => 
            array (
                'id' => 187,
                'order_id' => 27,
                'qty' => 508,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 259,
            ),
            163 => 
            array (
                'id' => 188,
                'order_id' => 27,
                'qty' => 532,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 260,
            ),
            164 => 
            array (
                'id' => 189,
                'order_id' => 27,
                'qty' => 520,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 261,
            ),
            165 => 
            array (
                'id' => 190,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 264,
            ),
            166 => 
            array (
                'id' => 191,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 265,
            ),
            167 => 
            array (
                'id' => 193,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 266,
            ),
            168 => 
            array (
                'id' => 194,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 267,
            ),
            169 => 
            array (
                'id' => 196,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-09-22',
                'product_feature_id' => 268,
            ),
            170 => 
            array (
                'id' => 197,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 269,
            ),
            171 => 
            array (
                'id' => 198,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 270,
            ),
            172 => 
            array (
                'id' => 199,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 271,
            ),
            173 => 
            array (
                'id' => 200,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 272,
            ),
            174 => 
            array (
                'id' => 201,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 273,
            ),
            175 => 
            array (
                'id' => 202,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 274,
            ),
            176 => 
            array (
                'id' => 203,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 275,
            ),
            177 => 
            array (
                'id' => 204,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 276,
            ),
            178 => 
            array (
                'id' => 205,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 277,
            ),
            179 => 
            array (
                'id' => 206,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 278,
            ),
            180 => 
            array (
                'id' => 207,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 279,
            ),
            181 => 
            array (
                'id' => 208,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 280,
            ),
            182 => 
            array (
                'id' => 209,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 280,
            ),
            183 => 
            array (
                'id' => 210,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 281,
            ),
            184 => 
            array (
                'id' => 211,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 282,
            ),
            185 => 
            array (
                'id' => 212,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 283,
            ),
            186 => 
            array (
                'id' => 213,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 284,
            ),
            187 => 
            array (
                'id' => 214,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 285,
            ),
            188 => 
            array (
                'id' => 215,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 286,
            ),
            189 => 
            array (
                'id' => 216,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 287,
            ),
            190 => 
            array (
                'id' => 217,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 288,
            ),
            191 => 
            array (
                'id' => 218,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 289,
            ),
            192 => 
            array (
                'id' => 219,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 290,
            ),
            193 => 
            array (
                'id' => 220,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 291,
            ),
            194 => 
            array (
                'id' => 221,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 292,
            ),
            195 => 
            array (
                'id' => 222,
                'order_id' => 7,
                'qty' => 200,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 293,
            ),
            196 => 
            array (
                'id' => 223,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 296,
            ),
            197 => 
            array (
                'id' => 224,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 297,
            ),
            198 => 
            array (
                'id' => 225,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 298,
            ),
            199 => 
            array (
                'id' => 226,
                'order_id' => 26,
                'qty' => 100,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 299,
            ),
            200 => 
            array (
                'id' => 227,
                'order_id' => 28,
                'qty' => 20,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 300,
            ),
            201 => 
            array (
                'id' => 228,
                'order_id' => 28,
                'qty' => 25,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 301,
            ),
            202 => 
            array (
                'id' => 229,
                'order_id' => 28,
                'qty' => 50,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 302,
            ),
            203 => 
            array (
                'id' => 230,
                'order_id' => 28,
                'qty' => 120,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 303,
            ),
            204 => 
            array (
                'id' => 231,
                'order_id' => 28,
                'qty' => 260,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 304,
            ),
            205 => 
            array (
                'id' => 232,
                'order_id' => 28,
                'qty' => 360,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 305,
            ),
            206 => 
            array (
                'id' => 233,
                'order_id' => 28,
                'qty' => 210,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 306,
            ),
            207 => 
            array (
                'id' => 234,
                'order_id' => 28,
                'qty' => 60,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 307,
            ),
            208 => 
            array (
                'id' => 235,
                'order_id' => 28,
                'qty' => 15,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 308,
            ),
            209 => 
            array (
                'id' => 236,
                'order_id' => 28,
                'qty' => 300,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 309,
            ),
            210 => 
            array (
                'id' => 237,
                'order_id' => 28,
                'qty' => 431,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 310,
            ),
            211 => 
            array (
                'id' => 238,
                'order_id' => 28,
                'qty' => 130,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 311,
            ),
            212 => 
            array (
                'id' => 251,
                'order_id' => 30,
                'qty' => 55,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 312,
            ),
            213 => 
            array (
                'id' => 252,
                'order_id' => 30,
                'qty' => 130,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 313,
            ),
            214 => 
            array (
                'id' => 253,
                'order_id' => 30,
                'qty' => 131,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 314,
            ),
            215 => 
            array (
                'id' => 254,
                'order_id' => 30,
                'qty' => 100,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 315,
            ),
            216 => 
            array (
                'id' => 255,
                'order_id' => 30,
                'qty' => 70,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 316,
            ),
            217 => 
            array (
                'id' => 256,
                'order_id' => 30,
                'qty' => 30,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 317,
            ),
            218 => 
            array (
                'id' => 257,
                'order_id' => 30,
                'qty' => 20,
                'unit_price' => 120280,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 318,
            ),
            219 => 
            array (
                'id' => 258,
                'order_id' => 31,
                'qty' => 100,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 339,
            ),
            220 => 
            array (
                'id' => 259,
                'order_id' => 31,
                'qty' => 100,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 340,
            ),
            221 => 
            array (
                'id' => 260,
                'order_id' => 31,
                'qty' => 100,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 341,
            ),
            222 => 
            array (
                'id' => 261,
                'order_id' => 32,
                'qty' => 49,
                'unit_price' => 11700,
                'shipment_estimated' => '2022-10-19',
                'product_feature_id' => 465,
            ),
            223 => 
            array (
                'id' => 262,
                'order_id' => 32,
                'qty' => 65,
                'unit_price' => 11700,
                'shipment_estimated' => '2022-10-19',
                'product_feature_id' => 466,
            ),
            224 => 
            array (
                'id' => 263,
                'order_id' => 33,
                'qty' => 389,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 354,
            ),
            225 => 
            array (
                'id' => 264,
                'order_id' => 33,
                'qty' => 558,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 355,
            ),
            226 => 
            array (
                'id' => 265,
                'order_id' => 33,
                'qty' => 360,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 356,
            ),
            227 => 
            array (
                'id' => 266,
                'order_id' => 33,
                'qty' => 778,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 357,
            ),
            228 => 
            array (
                'id' => 267,
                'order_id' => 33,
                'qty' => 1116,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 358,
            ),
            229 => 
            array (
                'id' => 268,
                'order_id' => 33,
                'qty' => 820,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 359,
            ),
            230 => 
            array (
                'id' => 269,
                'order_id' => 33,
                'qty' => 778,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 360,
            ),
            231 => 
            array (
                'id' => 270,
                'order_id' => 33,
                'qty' => 1116,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 361,
            ),
            232 => 
            array (
                'id' => 271,
                'order_id' => 33,
                'qty' => 389,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 363,
            ),
            233 => 
            array (
                'id' => 272,
                'order_id' => 33,
                'qty' => 820,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 362,
            ),
            234 => 
            array (
                'id' => 273,
                'order_id' => 33,
                'qty' => 558,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 364,
            ),
            235 => 
            array (
                'id' => 274,
                'order_id' => 33,
                'qty' => 360,
                'unit_price' => 34000,
                'shipment_estimated' => '2022-10-31',
                'product_feature_id' => 365,
            ),
            236 => 
            array (
                'id' => 275,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 471,
            ),
            237 => 
            array (
                'id' => 276,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 492,
            ),
            238 => 
            array (
                'id' => 277,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 493,
            ),
            239 => 
            array (
                'id' => 278,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 494,
            ),
            240 => 
            array (
                'id' => 279,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 495,
            ),
            241 => 
            array (
                'id' => 280,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 496,
            ),
            242 => 
            array (
                'id' => 281,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 497,
            ),
            243 => 
            array (
                'id' => 282,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 498,
            ),
            244 => 
            array (
                'id' => 283,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 499,
            ),
            245 => 
            array (
                'id' => 284,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 500,
            ),
            246 => 
            array (
                'id' => 285,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 501,
            ),
            247 => 
            array (
                'id' => 286,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 513,
            ),
            248 => 
            array (
                'id' => 287,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 515,
            ),
            249 => 
            array (
                'id' => 288,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 516,
            ),
            250 => 
            array (
                'id' => 289,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 517,
            ),
            251 => 
            array (
                'id' => 290,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 518,
            ),
            252 => 
            array (
                'id' => 291,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 519,
            ),
            253 => 
            array (
                'id' => 292,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 520,
            ),
            254 => 
            array (
                'id' => 293,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 521,
            ),
            255 => 
            array (
                'id' => 294,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 523,
            ),
            256 => 
            array (
                'id' => 295,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 525,
            ),
            257 => 
            array (
                'id' => 296,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 527,
            ),
            258 => 
            array (
                'id' => 297,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 528,
            ),
            259 => 
            array (
                'id' => 298,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 530,
            ),
            260 => 
            array (
                'id' => 299,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 529,
            ),
            261 => 
            array (
                'id' => 300,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 531,
            ),
            262 => 
            array (
                'id' => 301,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 532,
            ),
            263 => 
            array (
                'id' => 302,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 533,
            ),
            264 => 
            array (
                'id' => 303,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 534,
            ),
            265 => 
            array (
                'id' => 304,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 535,
            ),
            266 => 
            array (
                'id' => 305,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 536,
            ),
            267 => 
            array (
                'id' => 306,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 537,
            ),
            268 => 
            array (
                'id' => 307,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 538,
            ),
            269 => 
            array (
                'id' => 308,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 539,
            ),
            270 => 
            array (
                'id' => 309,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 540,
            ),
            271 => 
            array (
                'id' => 310,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 541,
            ),
            272 => 
            array (
                'id' => 311,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 542,
            ),
            273 => 
            array (
                'id' => 312,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 543,
            ),
            274 => 
            array (
                'id' => 313,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 544,
            ),
            275 => 
            array (
                'id' => 314,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 545,
            ),
            276 => 
            array (
                'id' => 315,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 546,
            ),
            277 => 
            array (
                'id' => 316,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 547,
            ),
            278 => 
            array (
                'id' => 317,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 548,
            ),
            279 => 
            array (
                'id' => 318,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 549,
            ),
            280 => 
            array (
                'id' => 319,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 550,
            ),
            281 => 
            array (
                'id' => 320,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 551,
            ),
            282 => 
            array (
                'id' => 321,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 552,
            ),
            283 => 
            array (
                'id' => 322,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 553,
            ),
            284 => 
            array (
                'id' => 323,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 554,
            ),
            285 => 
            array (
                'id' => 324,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 555,
            ),
            286 => 
            array (
                'id' => 325,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 556,
            ),
            287 => 
            array (
                'id' => 326,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 557,
            ),
            288 => 
            array (
                'id' => 327,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 558,
            ),
            289 => 
            array (
                'id' => 328,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 559,
            ),
            290 => 
            array (
                'id' => 329,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 560,
            ),
            291 => 
            array (
                'id' => 330,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 561,
            ),
            292 => 
            array (
                'id' => 331,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 562,
            ),
            293 => 
            array (
                'id' => 332,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 563,
            ),
            294 => 
            array (
                'id' => 333,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 564,
            ),
            295 => 
            array (
                'id' => 334,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 565,
            ),
            296 => 
            array (
                'id' => 335,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 566,
            ),
            297 => 
            array (
                'id' => 336,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 567,
            ),
            298 => 
            array (
                'id' => 337,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 568,
            ),
            299 => 
            array (
                'id' => 338,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 569,
            ),
            300 => 
            array (
                'id' => 339,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 570,
            ),
            301 => 
            array (
                'id' => 340,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 571,
            ),
            302 => 
            array (
                'id' => 341,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 572,
            ),
            303 => 
            array (
                'id' => 342,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 573,
            ),
            304 => 
            array (
                'id' => 343,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 574,
            ),
            305 => 
            array (
                'id' => 344,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 575,
            ),
            306 => 
            array (
                'id' => 345,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 576,
            ),
            307 => 
            array (
                'id' => 346,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 577,
            ),
            308 => 
            array (
                'id' => 347,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 578,
            ),
            309 => 
            array (
                'id' => 348,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 579,
            ),
            310 => 
            array (
                'id' => 349,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 580,
            ),
            311 => 
            array (
                'id' => 350,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 581,
            ),
            312 => 
            array (
                'id' => 351,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 582,
            ),
            313 => 
            array (
                'id' => 352,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 583,
            ),
            314 => 
            array (
                'id' => 353,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 584,
            ),
            315 => 
            array (
                'id' => 354,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 585,
            ),
            316 => 
            array (
                'id' => 355,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 586,
            ),
            317 => 
            array (
                'id' => 356,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 587,
            ),
            318 => 
            array (
                'id' => 357,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 588,
            ),
            319 => 
            array (
                'id' => 358,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 589,
            ),
            320 => 
            array (
                'id' => 359,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 590,
            ),
            321 => 
            array (
                'id' => 360,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 591,
            ),
            322 => 
            array (
                'id' => 361,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 592,
            ),
            323 => 
            array (
                'id' => 362,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 593,
            ),
            324 => 
            array (
                'id' => 363,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 594,
            ),
            325 => 
            array (
                'id' => 364,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 595,
            ),
            326 => 
            array (
                'id' => 365,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 596,
            ),
            327 => 
            array (
                'id' => 366,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 597,
            ),
            328 => 
            array (
                'id' => 367,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 598,
            ),
            329 => 
            array (
                'id' => 368,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 599,
            ),
            330 => 
            array (
                'id' => 369,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 600,
            ),
            331 => 
            array (
                'id' => 370,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 602,
            ),
            332 => 
            array (
                'id' => 371,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 603,
            ),
            333 => 
            array (
                'id' => 372,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 605,
            ),
            334 => 
            array (
                'id' => 373,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 606,
            ),
            335 => 
            array (
                'id' => 374,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 608,
            ),
            336 => 
            array (
                'id' => 375,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 609,
            ),
            337 => 
            array (
                'id' => 376,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 611,
            ),
            338 => 
            array (
                'id' => 377,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 612,
            ),
            339 => 
            array (
                'id' => 378,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 613,
            ),
            340 => 
            array (
                'id' => 379,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 614,
            ),
            341 => 
            array (
                'id' => 380,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 615,
            ),
            342 => 
            array (
                'id' => 381,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 616,
            ),
            343 => 
            array (
                'id' => 382,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 617,
            ),
            344 => 
            array (
                'id' => 383,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 618,
            ),
            345 => 
            array (
                'id' => 384,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 619,
            ),
            346 => 
            array (
                'id' => 385,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 620,
            ),
            347 => 
            array (
                'id' => 386,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 621,
            ),
            348 => 
            array (
                'id' => 387,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 622,
            ),
            349 => 
            array (
                'id' => 388,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 623,
            ),
            350 => 
            array (
                'id' => 389,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 624,
            ),
            351 => 
            array (
                'id' => 390,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 625,
            ),
            352 => 
            array (
                'id' => 391,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 627,
            ),
            353 => 
            array (
                'id' => 392,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 628,
            ),
            354 => 
            array (
                'id' => 393,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 629,
            ),
            355 => 
            array (
                'id' => 394,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 630,
            ),
            356 => 
            array (
                'id' => 395,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 631,
            ),
            357 => 
            array (
                'id' => 396,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 632,
            ),
            358 => 
            array (
                'id' => 397,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 633,
            ),
            359 => 
            array (
                'id' => 398,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 634,
            ),
            360 => 
            array (
                'id' => 399,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 25000,
                'shipment_estimated' => '2022-10-28',
                'product_feature_id' => 635,
            ),
            361 => 
            array (
                'id' => 400,
                'order_id' => 34,
                'qty' => 0,
                'unit_price' => 0,
                'shipment_estimated' => '2022-04-03',
                'product_feature_id' => 636,
            ),
            362 => 
            array (
                'id' => 401,
                'order_id' => 35,
                'qty' => 378,
                'unit_price' => 18000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 641,
            ),
            363 => 
            array (
                'id' => 402,
                'order_id' => 35,
                'qty' => 458,
                'unit_price' => 18000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 642,
            ),
            364 => 
            array (
                'id' => 403,
                'order_id' => 35,
                'qty' => 418,
                'unit_price' => 18000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 643,
            ),
            365 => 
            array (
                'id' => 407,
                'order_id' => 37,
                'qty' => 50,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 644,
            ),
            366 => 
            array (
                'id' => 408,
                'order_id' => 37,
                'qty' => 384,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 645,
            ),
            367 => 
            array (
                'id' => 409,
                'order_id' => 37,
                'qty' => 384,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 646,
            ),
            368 => 
            array (
                'id' => 410,
                'order_id' => 37,
                'qty' => 334,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 647,
            ),
            369 => 
            array (
                'id' => 411,
                'order_id' => 38,
                'qty' => 50,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 644,
            ),
            370 => 
            array (
                'id' => 412,
                'order_id' => 38,
                'qty' => 384,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 645,
            ),
            371 => 
            array (
                'id' => 413,
                'order_id' => 38,
                'qty' => 384,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 646,
            ),
            372 => 
            array (
                'id' => 414,
                'order_id' => 38,
                'qty' => 334,
                'unit_price' => 19000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 647,
            ),
            373 => 
            array (
                'id' => 415,
                'order_id' => 39,
                'qty' => 646,
                'unit_price' => 18000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 648,
            ),
            374 => 
            array (
                'id' => 416,
                'order_id' => 39,
                'qty' => 490,
                'unit_price' => 18000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 649,
            ),
            375 => 
            array (
                'id' => 417,
                'order_id' => 39,
                'qty' => 310,
                'unit_price' => 18000,
                'shipment_estimated' => '2022-11-04',
                'product_feature_id' => 650,
            ),
            376 => 
            array (
                'id' => 422,
                'order_id' => 40,
                'qty' => 708,
                'unit_price' => 18000,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 656,
            ),
            377 => 
            array (
                'id' => 423,
                'order_id' => 40,
                'qty' => 760,
                'unit_price' => 18000,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 655,
            ),
            378 => 
            array (
                'id' => 424,
                'order_id' => 40,
                'qty' => 668,
                'unit_price' => 18000,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 654,
            ),
            379 => 
            array (
                'id' => 425,
                'order_id' => 41,
                'qty' => 10,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 50,
            ),
            380 => 
            array (
                'id' => 426,
                'order_id' => 41,
                'qty' => 25,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 51,
            ),
            381 => 
            array (
                'id' => 427,
                'order_id' => 41,
                'qty' => 22,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 52,
            ),
            382 => 
            array (
                'id' => 428,
                'order_id' => 41,
                'qty' => 3,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 53,
            ),
            383 => 
            array (
                'id' => 429,
                'order_id' => 41,
                'qty' => 10,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 54,
            ),
            384 => 
            array (
                'id' => 430,
                'order_id' => 41,
                'qty' => 30,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 55,
            ),
            385 => 
            array (
                'id' => 431,
                'order_id' => 41,
                'qty' => 100,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 56,
            ),
            386 => 
            array (
                'id' => 432,
                'order_id' => 41,
                'qty' => 200,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 57,
            ),
            387 => 
            array (
                'id' => 433,
                'order_id' => 41,
                'qty' => 8,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 58,
            ),
            388 => 
            array (
                'id' => 434,
                'order_id' => 41,
                'qty' => 35,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 59,
            ),
            389 => 
            array (
                'id' => 435,
                'order_id' => 41,
                'qty' => 50,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 60,
            ),
            390 => 
            array (
                'id' => 436,
                'order_id' => 41,
                'qty' => 125,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 61,
            ),
            391 => 
            array (
                'id' => 437,
                'order_id' => 41,
                'qty' => 50,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 62,
            ),
            392 => 
            array (
                'id' => 438,
                'order_id' => 41,
                'qty' => 80,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 63,
            ),
            393 => 
            array (
                'id' => 439,
                'order_id' => 41,
                'qty' => 75,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 64,
            ),
            394 => 
            array (
                'id' => 440,
                'order_id' => 41,
                'qty' => 50,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 65,
            ),
            395 => 
            array (
                'id' => 441,
                'order_id' => 41,
                'qty' => 10,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 66,
            ),
            396 => 
            array (
                'id' => 442,
                'order_id' => 41,
                'qty' => 15,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 657,
            ),
            397 => 
            array (
                'id' => 443,
                'order_id' => 41,
                'qty' => 30,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 658,
            ),
            398 => 
            array (
                'id' => 444,
                'order_id' => 41,
                'qty' => 25,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 659,
            ),
            399 => 
            array (
                'id' => 445,
                'order_id' => 41,
                'qty' => 50,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 660,
            ),
            400 => 
            array (
                'id' => 446,
                'order_id' => 42,
                'qty' => 25,
                'unit_price' => 69255,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 467,
            ),
            401 => 
            array (
                'id' => 447,
                'order_id' => 42,
                'qty' => 75,
                'unit_price' => 69255,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 661,
            ),
            402 => 
            array (
                'id' => 448,
                'order_id' => 42,
                'qty' => 100,
                'unit_price' => 69255,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 662,
            ),
            403 => 
            array (
                'id' => 449,
                'order_id' => 42,
                'qty' => 100,
                'unit_price' => 69255,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 663,
            ),
            404 => 
            array (
                'id' => 450,
                'order_id' => 42,
                'qty' => 150,
                'unit_price' => 69255,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 664,
            ),
            405 => 
            array (
                'id' => 451,
                'order_id' => 42,
                'qty' => 50,
                'unit_price' => 69255,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 665,
            ),
            406 => 
            array (
                'id' => 452,
                'order_id' => 43,
                'qty' => 5,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 468,
            ),
            407 => 
            array (
                'id' => 453,
                'order_id' => 43,
                'qty' => 20,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 681,
            ),
            408 => 
            array (
                'id' => 454,
                'order_id' => 43,
                'qty' => 5,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 682,
            ),
            409 => 
            array (
                'id' => 455,
                'order_id' => 43,
                'qty' => 15,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 683,
            ),
            410 => 
            array (
                'id' => 456,
                'order_id' => 43,
                'qty' => 16,
                'unit_price' => 73872,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 684,
            ),
            411 => 
            array (
                'id' => 457,
                'order_id' => 44,
                'qty' => 10,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 470,
            ),
            412 => 
            array (
                'id' => 458,
                'order_id' => 44,
                'qty' => 100,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 666,
            ),
            413 => 
            array (
                'id' => 459,
                'order_id' => 44,
                'qty' => 50,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 667,
            ),
            414 => 
            array (
                'id' => 460,
                'order_id' => 44,
                'qty' => 75,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 668,
            ),
            415 => 
            array (
                'id' => 461,
                'order_id' => 44,
                'qty' => 50,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 669,
            ),
            416 => 
            array (
                'id' => 462,
                'order_id' => 44,
                'qty' => 10,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 670,
            ),
            417 => 
            array (
                'id' => 463,
                'order_id' => 44,
                'qty' => 15,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 671,
            ),
            418 => 
            array (
                'id' => 464,
                'order_id' => 44,
                'qty' => 15,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 672,
            ),
            419 => 
            array (
                'id' => 465,
                'order_id' => 44,
                'qty' => 30,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 673,
            ),
            420 => 
            array (
                'id' => 466,
                'order_id' => 44,
                'qty' => 2,
                'unit_price' => 74334,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 674,
            ),
            421 => 
            array (
                'id' => 467,
                'order_id' => 45,
                'qty' => 30,
                'unit_price' => 76950,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 469,
            ),
            422 => 
            array (
                'id' => 468,
                'order_id' => 45,
                'qty' => 25,
                'unit_price' => 76950,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 676,
            ),
            423 => 
            array (
                'id' => 469,
                'order_id' => 45,
                'qty' => 5,
                'unit_price' => 76950,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 677,
            ),
            424 => 
            array (
                'id' => 470,
                'order_id' => 45,
                'qty' => 15,
                'unit_price' => 76950,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 678,
            ),
            425 => 
            array (
                'id' => 471,
                'order_id' => 45,
                'qty' => 15,
                'unit_price' => 76950,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 679,
            ),
            426 => 
            array (
                'id' => 472,
                'order_id' => 45,
                'qty' => 10,
                'unit_price' => 76950,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 680,
            ),
            427 => 
            array (
                'id' => 473,
                'order_id' => 46,
                'qty' => 336,
                'unit_price' => 18000,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 651,
            ),
            428 => 
            array (
                'id' => 474,
                'order_id' => 46,
                'qty' => 416,
                'unit_price' => 18000,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 652,
            ),
            429 => 
            array (
                'id' => 475,
                'order_id' => 46,
                'qty' => 376,
                'unit_price' => 18000,
                'shipment_estimated' => '1970-01-01',
                'product_feature_id' => 653,
            ),
        ));
        
        
    }
}