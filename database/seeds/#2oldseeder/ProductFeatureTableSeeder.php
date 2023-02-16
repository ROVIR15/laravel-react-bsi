<?php

use Illuminate\Database\Seeder;

class ProductFeatureTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('product_feature')->delete();
        
        \DB::table('product_feature')->insert(array (
            0 => 
            array (
                'id' => 9,
                'product_id' => 2,
                'color' => 'Khaky',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            1 => 
            array (
                'id' => 10,
                'product_id' => 2,
                'color' => 'Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            2 => 
            array (
                'id' => 11,
                'product_id' => 2,
                'color' => 'Khaky',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            3 => 
            array (
                'id' => 12,
                'product_id' => 2,
                'color' => 'Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            4 => 
            array (
                'id' => 13,
                'product_id' => 2,
                'color' => 'Khaky',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            5 => 
            array (
                'id' => 14,
                'product_id' => 2,
                'color' => 'Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            6 => 
            array (
                'id' => 15,
                'product_id' => 3,
                'color' => 'Khaky',
                'size' => '11',
                'price_component_id' => NULL,
            ),
            7 => 
            array (
                'id' => 16,
                'product_id' => 3,
                'color' => 'Biru',
                'size' => '11',
                'price_component_id' => NULL,
            ),
            8 => 
            array (
                'id' => 17,
                'product_id' => 3,
                'color' => 'Black',
                'size' => '11',
                'price_component_id' => NULL,
            ),
            9 => 
            array (
                'id' => 28,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            10 => 
            array (
                'id' => 29,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            11 => 
            array (
                'id' => 30,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            12 => 
            array (
                'id' => 31,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            13 => 
            array (
                'id' => 32,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            14 => 
            array (
                'id' => 33,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            15 => 
            array (
                'id' => 34,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            16 => 
            array (
                'id' => 35,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            17 => 
            array (
                'id' => 36,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            18 => 
            array (
                'id' => 37,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            19 => 
            array (
                'id' => 38,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            20 => 
            array (
                'id' => 39,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            21 => 
            array (
                'id' => 40,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            22 => 
            array (
                'id' => 41,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            23 => 
            array (
                'id' => 42,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            24 => 
            array (
                'id' => 43,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            25 => 
            array (
                'id' => 44,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            26 => 
            array (
                'id' => 45,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            27 => 
            array (
                'id' => 46,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            28 => 
            array (
                'id' => 47,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            29 => 
            array (
                'id' => 48,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            30 => 
            array (
                'id' => 49,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            31 => 
            array (
                'id' => 50,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '84L',
                'price_component_id' => NULL,
            ),
            32 => 
            array (
                'id' => 51,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '94L',
                'price_component_id' => NULL,
            ),
            33 => 
            array (
                'id' => 52,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '72R',
                'price_component_id' => NULL,
            ),
            34 => 
            array (
                'id' => 53,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '79L',
                'price_component_id' => NULL,
            ),
            35 => 
            array (
                'id' => 54,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '89L',
                'price_component_id' => NULL,
            ),
            36 => 
            array (
                'id' => 55,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '87S',
                'price_component_id' => NULL,
            ),
            37 => 
            array (
                'id' => 56,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '97R',
                'price_component_id' => NULL,
            ),
            38 => 
            array (
                'id' => 57,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '102R',
                'price_component_id' => NULL,
            ),
            39 => 
            array (
                'id' => 58,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '99L',
                'price_component_id' => NULL,
            ),
            40 => 
            array (
                'id' => 59,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '77R',
                'price_component_id' => NULL,
            ),
            41 => 
            array (
                'id' => 60,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '82R',
                'price_component_id' => NULL,
            ),
            42 => 
            array (
                'id' => 61,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '92R',
                'price_component_id' => NULL,
            ),
            43 => 
            array (
                'id' => 62,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '107R',
                'price_component_id' => NULL,
            ),
            44 => 
            array (
                'id' => 63,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '92S',
                'price_component_id' => NULL,
            ),
            45 => 
            array (
                'id' => 64,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '97S',
                'price_component_id' => NULL,
            ),
            46 => 
            array (
                'id' => 65,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '87R',
                'price_component_id' => NULL,
            ),
            47 => 
            array (
                'id' => 66,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '112R',
                'price_component_id' => NULL,
            ),
            48 => 
            array (
                'id' => 84,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            49 => 
            array (
                'id' => 85,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            50 => 
            array (
                'id' => 86,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            51 => 
            array (
                'id' => 87,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '2XL',
                'price_component_id' => NULL,
            ),
            52 => 
            array (
                'id' => 88,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '3XL',
                'price_component_id' => NULL,
            ),
            53 => 
            array (
                'id' => 89,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '4XL',
                'price_component_id' => NULL,
            ),
            54 => 
            array (
                'id' => 90,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '5XL',
                'price_component_id' => NULL,
            ),
            55 => 
            array (
                'id' => 91,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            56 => 
            array (
                'id' => 92,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            57 => 
            array (
                'id' => 93,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            58 => 
            array (
                'id' => 94,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            59 => 
            array (
                'id' => 95,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            60 => 
            array (
                'id' => 96,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            61 => 
            array (
                'id' => 97,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            62 => 
            array (
                'id' => 98,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            63 => 
            array (
                'id' => 99,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            64 => 
            array (
                'id' => 100,
                'product_id' => 13,
                'color' => 'Black',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            65 => 
            array (
                'id' => 101,
                'product_id' => 13,
                'color' => 'Khaky',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            66 => 
            array (
                'id' => 102,
                'product_id' => 13,
                'color' => 'Olive',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            67 => 
            array (
                'id' => 103,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            68 => 
            array (
                'id' => 104,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            69 => 
            array (
                'id' => 105,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            70 => 
            array (
                'id' => 106,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            71 => 
            array (
                'id' => 107,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            72 => 
            array (
                'id' => 108,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            73 => 
            array (
                'id' => 109,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            74 => 
            array (
                'id' => 110,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            75 => 
            array (
                'id' => 111,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            76 => 
            array (
                'id' => 112,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            77 => 
            array (
                'id' => 113,
                'product_id' => 15,
                'color' => 'Khaky',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            78 => 
            array (
                'id' => 114,
                'product_id' => 15,
                'color' => 'Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            79 => 
            array (
                'id' => 115,
                'product_id' => 15,
                'color' => 'Khaky',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            80 => 
            array (
                'id' => 116,
                'product_id' => 15,
                'color' => 'Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            81 => 
            array (
                'id' => 117,
                'product_id' => 16,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            82 => 
            array (
                'id' => 118,
                'product_id' => 17,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            83 => 
            array (
                'id' => 119,
                'product_id' => 18,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            84 => 
            array (
                'id' => 120,
                'product_id' => 19,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            85 => 
            array (
                'id' => 121,
                'product_id' => 20,
                'color' => 'Olive',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            86 => 
            array (
                'id' => 122,
                'product_id' => 20,
                'color' => 'Olive',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            87 => 
            array (
                'id' => 123,
                'product_id' => 20,
                'color' => 'Olive',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            88 => 
            array (
                'id' => 124,
                'product_id' => 20,
                'color' => 'Olive',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            89 => 
            array (
                'id' => 125,
                'product_id' => 21,
                'color' => 'Olive',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            90 => 
            array (
                'id' => 126,
                'product_id' => 21,
                'color' => 'Olive',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            91 => 
            array (
                'id' => 127,
                'product_id' => 21,
                'color' => 'Olive',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            92 => 
            array (
                'id' => 128,
                'product_id' => 21,
                'color' => 'Olive',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            93 => 
            array (
                'id' => 129,
                'product_id' => 22,
                'color' => 'Olive',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            94 => 
            array (
                'id' => 130,
                'product_id' => 22,
                'color' => 'Olive',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            95 => 
            array (
                'id' => 131,
                'product_id' => 22,
                'color' => 'Olive',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            96 => 
            array (
                'id' => 132,
                'product_id' => 22,
                'color' => 'Olive',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            97 => 
            array (
                'id' => 133,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            98 => 
            array (
                'id' => 134,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            99 => 
            array (
                'id' => 135,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            100 => 
            array (
                'id' => 136,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            101 => 
            array (
                'id' => 137,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            102 => 
            array (
                'id' => 138,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            103 => 
            array (
                'id' => 139,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            104 => 
            array (
                'id' => 140,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            105 => 
            array (
                'id' => 141,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            106 => 
            array (
                'id' => 142,
                'product_id' => 23,
                'color' => 'Jet Black',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            107 => 
            array (
                'id' => 143,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '41',
                'price_component_id' => NULL,
            ),
            108 => 
            array (
                'id' => 144,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            109 => 
            array (
                'id' => 145,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '43',
                'price_component_id' => NULL,
            ),
            110 => 
            array (
                'id' => 146,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            111 => 
            array (
                'id' => 147,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '45',
                'price_component_id' => NULL,
            ),
            112 => 
            array (
                'id' => 148,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '37',
                'price_component_id' => NULL,
            ),
            113 => 
            array (
                'id' => 149,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            114 => 
            array (
                'id' => 150,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '35',
                'price_component_id' => NULL,
            ),
            115 => 
            array (
                'id' => 151,
                'product_id' => 24,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            116 => 
            array (
                'id' => 152,
                'product_id' => 25,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            117 => 
            array (
                'id' => 153,
                'product_id' => 26,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            118 => 
            array (
                'id' => 154,
                'product_id' => 27,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            119 => 
            array (
                'id' => 155,
                'product_id' => 28,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            120 => 
            array (
                'id' => 156,
                'product_id' => 29,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            121 => 
            array (
                'id' => 157,
                'product_id' => 30,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            122 => 
            array (
                'id' => 158,
                'product_id' => 31,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            123 => 
            array (
                'id' => 159,
                'product_id' => 32,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            124 => 
            array (
                'id' => 160,
                'product_id' => 33,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            125 => 
            array (
                'id' => 161,
                'product_id' => 34,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            126 => 
            array (
                'id' => 162,
                'product_id' => 35,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            127 => 
            array (
                'id' => 163,
                'product_id' => 36,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            128 => 
            array (
                'id' => 164,
                'product_id' => 37,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            129 => 
            array (
                'id' => 165,
                'product_id' => 49,
                'color' => 'GREEN TEA',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            130 => 
            array (
                'id' => 166,
                'product_id' => 49,
                'color' => 'MILK TEA',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            131 => 
            array (
                'id' => 167,
                'product_id' => 49,
                'color' => 'MOSS GREEN',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            132 => 
            array (
                'id' => 168,
                'product_id' => 50,
                'color' => 'PUTIH',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            133 => 
            array (
                'id' => 169,
                'product_id' => 51,
                'color' => 'PUTIH',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            134 => 
            array (
                'id' => 170,
                'product_id' => 20,
                'color' => 'Brown',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            135 => 
            array (
                'id' => 171,
                'product_id' => 20,
                'color' => 'Brown',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            136 => 
            array (
                'id' => 172,
                'product_id' => 20,
                'color' => 'Brown',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            137 => 
            array (
                'id' => 173,
                'product_id' => 20,
                'color' => 'Brown',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            138 => 
            array (
                'id' => 174,
                'product_id' => 21,
                'color' => 'Black',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            139 => 
            array (
                'id' => 175,
                'product_id' => 21,
                'color' => 'Black',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            140 => 
            array (
                'id' => 176,
                'product_id' => 21,
                'color' => 'Black',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            141 => 
            array (
                'id' => 177,
                'product_id' => 21,
                'color' => 'Black',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            142 => 
            array (
                'id' => 178,
                'product_id' => 21,
                'color' => 'Brown',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            143 => 
            array (
                'id' => 179,
                'product_id' => 21,
                'color' => 'Brown',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            144 => 
            array (
                'id' => 180,
                'product_id' => 21,
                'color' => 'Brown',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            145 => 
            array (
                'id' => 181,
                'product_id' => 21,
                'color' => 'Brown',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            146 => 
            array (
                'id' => 182,
                'product_id' => 52,
                'color' => 'M',
                'size' => 'Black',
                'price_component_id' => NULL,
            ),
            147 => 
            array (
                'id' => 183,
                'product_id' => 52,
                'color' => 'L',
                'size' => 'Black',
                'price_component_id' => NULL,
            ),
            148 => 
            array (
                'id' => 184,
                'product_id' => 52,
                'color' => 'XL',
                'size' => 'Black',
                'price_component_id' => NULL,
            ),
            149 => 
            array (
                'id' => 185,
                'product_id' => 52,
                'color' => 'XXL',
                'size' => 'Black',
                'price_component_id' => NULL,
            ),
            150 => 
            array (
                'id' => 186,
                'product_id' => 53,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            151 => 
            array (
                'id' => 187,
                'product_id' => 54,
                'color' => 'ABU',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            152 => 
            array (
                'id' => 189,
                'product_id' => 56,
                'color' => 'ABU',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            153 => 
            array (
                'id' => 190,
                'product_id' => 57,
                'color' => 'DEEP TEAL 19-4914 TPX',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            154 => 
            array (
                'id' => 191,
                'product_id' => 57,
                'color' => 'UMBER 18-1246 TPX',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            155 => 
            array (
                'id' => 192,
                'product_id' => 58,
                'color' => 'DEEP TEAL 19-4914 TPX',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            156 => 
            array (
                'id' => 193,
                'product_id' => 58,
                'color' => 'UMBER 18-1246 TPX',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            157 => 
            array (
                'id' => 194,
                'product_id' => 59,
                'color' => '-',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            158 => 
            array (
                'id' => 195,
                'product_id' => 60,
                'color' => 'Olive',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            159 => 
            array (
                'id' => 196,
                'product_id' => 60,
                'color' => 'Sand',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            160 => 
            array (
                'id' => 197,
                'product_id' => 60,
                'color' => 'Olive',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            161 => 
            array (
                'id' => 198,
                'product_id' => 60,
                'color' => 'Sand',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            162 => 
            array (
                'id' => 199,
                'product_id' => 60,
                'color' => 'Olive',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            163 => 
            array (
                'id' => 200,
                'product_id' => 60,
                'color' => 'Sand',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            164 => 
            array (
                'id' => 201,
                'product_id' => 60,
                'color' => 'Olive',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            165 => 
            array (
                'id' => 202,
                'product_id' => 60,
                'color' => 'Sand',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            166 => 
            array (
                'id' => 203,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            167 => 
            array (
                'id' => 204,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            168 => 
            array (
                'id' => 205,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            169 => 
            array (
                'id' => 206,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            170 => 
            array (
                'id' => 207,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            171 => 
            array (
                'id' => 208,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            172 => 
            array (
                'id' => 209,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            173 => 
            array (
                'id' => 210,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            174 => 
            array (
                'id' => 211,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            175 => 
            array (
                'id' => 212,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            176 => 
            array (
                'id' => 213,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            177 => 
            array (
                'id' => 214,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            178 => 
            array (
                'id' => 215,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            179 => 
            array (
                'id' => 216,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            180 => 
            array (
                'id' => 217,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            181 => 
            array (
                'id' => 218,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            182 => 
            array (
                'id' => 219,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            183 => 
            array (
                'id' => 220,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            184 => 
            array (
                'id' => 221,
                'product_id' => 61,
                'color' => 'Brown',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            185 => 
            array (
                'id' => 222,
                'product_id' => 61,
                'color' => 'Black',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            186 => 
            array (
                'id' => 223,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            187 => 
            array (
                'id' => 224,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            188 => 
            array (
                'id' => 225,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            189 => 
            array (
                'id' => 226,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            190 => 
            array (
                'id' => 227,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            191 => 
            array (
                'id' => 228,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            192 => 
            array (
                'id' => 229,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            193 => 
            array (
                'id' => 230,
                'product_id' => 62,
                'color' => 'Charcoal',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            194 => 
            array (
                'id' => 231,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            195 => 
            array (
                'id' => 232,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            196 => 
            array (
                'id' => 233,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            197 => 
            array (
                'id' => 234,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            198 => 
            array (
                'id' => 235,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            199 => 
            array (
                'id' => 236,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            200 => 
            array (
                'id' => 237,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            201 => 
            array (
                'id' => 238,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            202 => 
            array (
                'id' => 239,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            203 => 
            array (
                'id' => 240,
                'product_id' => 63,
                'color' => 'Stone',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            204 => 
            array (
                'id' => 256,
                'product_id' => 66,
                'color' => 'Abu',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            205 => 
            array (
                'id' => 257,
                'product_id' => 66,
                'color' => 'Abu',
                'size' => 'XXXL',
                'price_component_id' => NULL,
            ),
            206 => 
            array (
                'id' => 258,
                'product_id' => 66,
                'color' => 'Abu',
                'size' => 'XXXXL',
                'price_component_id' => NULL,
            ),
            207 => 
            array (
                'id' => 259,
                'product_id' => 67,
                'color' => 'Orange',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            208 => 
            array (
                'id' => 260,
                'product_id' => 67,
                'color' => 'Orange',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            209 => 
            array (
                'id' => 261,
                'product_id' => 67,
                'color' => 'Orange',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            210 => 
            array (
                'id' => 262,
                'product_id' => 68,
                'color' => 'ABU',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            211 => 
            array (
                'id' => 263,
                'product_id' => 68,
                'color' => 'NAVY',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            212 => 
            array (
                'id' => 264,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            213 => 
            array (
                'id' => 265,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            214 => 
            array (
                'id' => 266,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            215 => 
            array (
                'id' => 267,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            216 => 
            array (
                'id' => 268,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            217 => 
            array (
                'id' => 269,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            218 => 
            array (
                'id' => 270,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            219 => 
            array (
                'id' => 271,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            220 => 
            array (
                'id' => 272,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            221 => 
            array (
                'id' => 273,
                'product_id' => 14,
                'color' => 'Frost Grey',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            222 => 
            array (
                'id' => 274,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            223 => 
            array (
                'id' => 275,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            224 => 
            array (
                'id' => 276,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            225 => 
            array (
                'id' => 277,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            226 => 
            array (
                'id' => 278,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            227 => 
            array (
                'id' => 279,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            228 => 
            array (
                'id' => 280,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            229 => 
            array (
                'id' => 281,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            230 => 
            array (
                'id' => 282,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            231 => 
            array (
                'id' => 283,
                'product_id' => 14,
                'color' => 'Grey',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            232 => 
            array (
                'id' => 284,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            233 => 
            array (
                'id' => 285,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            234 => 
            array (
                'id' => 286,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            235 => 
            array (
                'id' => 287,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            236 => 
            array (
                'id' => 288,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            237 => 
            array (
                'id' => 289,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            238 => 
            array (
                'id' => 290,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            239 => 
            array (
                'id' => 291,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            240 => 
            array (
                'id' => 292,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            241 => 
            array (
                'id' => 293,
                'product_id' => 14,
                'color' => 'Mid Brown',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            242 => 
            array (
                'id' => 296,
                'product_id' => 60,
                'color' => 'Mustard',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            243 => 
            array (
                'id' => 297,
                'product_id' => 60,
                'color' => 'Mustard',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            244 => 
            array (
                'id' => 298,
                'product_id' => 60,
                'color' => 'Mustard',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            245 => 
            array (
                'id' => 299,
                'product_id' => 60,
                'color' => 'Mustard',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            246 => 
            array (
                'id' => 300,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '122',
                'price_component_id' => NULL,
            ),
            247 => 
            array (
                'id' => 301,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '127',
                'price_component_id' => NULL,
            ),
            248 => 
            array (
                'id' => 302,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '77',
                'price_component_id' => NULL,
            ),
            249 => 
            array (
                'id' => 303,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '82',
                'price_component_id' => NULL,
            ),
            250 => 
            array (
                'id' => 304,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '87',
                'price_component_id' => NULL,
            ),
            251 => 
            array (
                'id' => 305,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '102',
                'price_component_id' => NULL,
            ),
            252 => 
            array (
                'id' => 306,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '107',
                'price_component_id' => NULL,
            ),
            253 => 
            array (
                'id' => 307,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '117',
                'price_component_id' => NULL,
            ),
            254 => 
            array (
                'id' => 308,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '132',
                'price_component_id' => NULL,
            ),
            255 => 
            array (
                'id' => 309,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '92',
                'price_component_id' => NULL,
            ),
            256 => 
            array (
                'id' => 310,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '97',
                'price_component_id' => NULL,
            ),
            257 => 
            array (
                'id' => 311,
                'product_id' => 69,
                'color' => 'Yellow',
                'size' => '112',
                'price_component_id' => NULL,
            ),
            258 => 
            array (
                'id' => 312,
                'product_id' => 70,
                'color' => 'Yellow',
                'size' => '8',
                'price_component_id' => NULL,
            ),
            259 => 
            array (
                'id' => 313,
                'product_id' => 70,
                'color' => 'Yellow',
                'size' => '10',
                'price_component_id' => NULL,
            ),
            260 => 
            array (
                'id' => 314,
                'product_id' => 70,
                'color' => 'Yellow',
                'size' => '12',
                'price_component_id' => NULL,
            ),
            261 => 
            array (
                'id' => 315,
                'product_id' => 70,
                'color' => 'Yellow',
                'size' => '14',
                'price_component_id' => NULL,
            ),
            262 => 
            array (
                'id' => 316,
                'product_id' => 70,
                'color' => 'Yellow',
                'size' => '16',
                'price_component_id' => NULL,
            ),
            263 => 
            array (
                'id' => 317,
                'product_id' => 70,
                'color' => 'Yellow',
                'size' => '18',
                'price_component_id' => NULL,
            ),
            264 => 
            array (
                'id' => 318,
                'product_id' => 70,
                'color' => 'Yellow',
                'size' => '20',
                'price_component_id' => NULL,
            ),
            265 => 
            array (
                'id' => 319,
                'product_id' => 71,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            266 => 
            array (
                'id' => 320,
                'product_id' => 72,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            267 => 
            array (
                'id' => 321,
                'product_id' => 73,
                'color' => '0',
                'size' => '20/3',
                'price_component_id' => NULL,
            ),
            268 => 
            array (
                'id' => 322,
                'product_id' => 74,
                'color' => '0',
                'size' => '20/2',
                'price_component_id' => NULL,
            ),
            269 => 
            array (
                'id' => 323,
                'product_id' => 75,
                'color' => '0',
                'size' => '40/2',
                'price_component_id' => NULL,
            ),
            270 => 
            array (
                'id' => 324,
                'product_id' => 76,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            271 => 
            array (
                'id' => 325,
                'product_id' => 77,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            272 => 
            array (
                'id' => 326,
                'product_id' => 78,
                'color' => '0',
                'size' => '2XL',
                'price_component_id' => NULL,
            ),
            273 => 
            array (
                'id' => 327,
                'product_id' => 79,
                'color' => '0',
                'size' => '3XL',
                'price_component_id' => NULL,
            ),
            274 => 
            array (
                'id' => 328,
                'product_id' => 80,
                'color' => '0',
                'size' => '4XL',
                'price_component_id' => NULL,
            ),
            275 => 
            array (
                'id' => 329,
                'product_id' => 81,
                'color' => 'WHITE',
                'size' => 'ALL SIZE',
                'price_component_id' => NULL,
            ),
            276 => 
            array (
                'id' => 330,
                'product_id' => 82,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            277 => 
            array (
                'id' => 331,
                'product_id' => 83,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            278 => 
            array (
                'id' => 332,
                'product_id' => 84,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            279 => 
            array (
                'id' => 333,
                'product_id' => 85,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            280 => 
            array (
                'id' => 334,
                'product_id' => 86,
                'color' => '0',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            281 => 
            array (
                'id' => 335,
                'product_id' => 87,
                'color' => 'Navy',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            282 => 
            array (
                'id' => 336,
                'product_id' => 87,
                'color' => 'Navy',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            283 => 
            array (
                'id' => 337,
                'product_id' => 87,
                'color' => 'Navy',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            284 => 
            array (
                'id' => 338,
                'product_id' => 87,
                'color' => 'Navy',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            285 => 
            array (
                'id' => 339,
                'product_id' => 88,
                'color' => 'Usedlook',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            286 => 
            array (
                'id' => 340,
                'product_id' => 88,
                'color' => 'Usedlook',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            287 => 
            array (
                'id' => 341,
                'product_id' => 88,
                'color' => 'Usedlook',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            288 => 
            array (
                'id' => 354,
                'product_id' => 90,
                'color' => 'Black',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            289 => 
            array (
                'id' => 355,
                'product_id' => 90,
                'color' => 'Olive',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            290 => 
            array (
                'id' => 356,
                'product_id' => 90,
                'color' => 'Brown',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            291 => 
            array (
                'id' => 357,
                'product_id' => 90,
                'color' => 'Black',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            292 => 
            array (
                'id' => 358,
                'product_id' => 90,
                'color' => 'Olive',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            293 => 
            array (
                'id' => 359,
                'product_id' => 90,
                'color' => 'Brown',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            294 => 
            array (
                'id' => 360,
                'product_id' => 90,
                'color' => 'Black',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            295 => 
            array (
                'id' => 361,
                'product_id' => 90,
                'color' => 'Olive',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            296 => 
            array (
                'id' => 362,
                'product_id' => 90,
                'color' => 'Brown',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            297 => 
            array (
                'id' => 363,
                'product_id' => 90,
                'color' => 'Black',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            298 => 
            array (
                'id' => 364,
                'product_id' => 90,
                'color' => 'Olive',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            299 => 
            array (
                'id' => 365,
                'product_id' => 90,
                'color' => 'Brown',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            300 => 
            array (
                'id' => 366,
                'product_id' => 91,
                'color' => 'Dark Grey',
                'size' => 'solid size',
                'price_component_id' => NULL,
            ),
            301 => 
            array (
                'id' => 367,
                'product_id' => 91,
                'color' => 'Olive',
                'size' => 'solid size',
                'price_component_id' => NULL,
            ),
            302 => 
            array (
                'id' => 368,
                'product_id' => 91,
                'color' => 'Navy',
                'size' => 'solid size',
                'price_component_id' => NULL,
            ),
            303 => 
            array (
                'id' => 369,
                'product_id' => 91,
                'color' => 'Khaky',
                'size' => 'solid size',
                'price_component_id' => NULL,
            ),
            304 => 
            array (
                'id' => 370,
                'product_id' => 92,
                'color' => 'CLEAR NO PRINT',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            305 => 
            array (
                'id' => 371,
                'product_id' => 93,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            306 => 
            array (
                'id' => 372,
                'product_id' => 94,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            307 => 
            array (
                'id' => 373,
                'product_id' => 95,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            308 => 
            array (
                'id' => 374,
                'product_id' => 96,
                'color' => 'Stone',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            309 => 
            array (
                'id' => 375,
                'product_id' => 96,
                'color' => 'Stone',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            310 => 
            array (
                'id' => 376,
                'product_id' => 96,
                'color' => 'Stone',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            311 => 
            array (
                'id' => 377,
                'product_id' => 97,
                'color' => 'YELLOW',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            312 => 
            array (
                'id' => 378,
                'product_id' => 98,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            313 => 
            array (
                'id' => 379,
                'product_id' => 99,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            314 => 
            array (
                'id' => 380,
                'product_id' => 100,
                'color' => 'NAVY',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            315 => 
            array (
                'id' => 381,
                'product_id' => 101,
                'color' => 'SILVER RED',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            316 => 
            array (
                'id' => 382,
                'product_id' => 102,
                'color' => 'BROWN',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            317 => 
            array (
                'id' => 383,
                'product_id' => 103,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            318 => 
            array (
                'id' => 384,
                'product_id' => 104,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            319 => 
            array (
                'id' => 385,
                'product_id' => 105,
                'color' => 'SILVER',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            320 => 
            array (
                'id' => 386,
                'product_id' => 106,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            321 => 
            array (
                'id' => 387,
                'product_id' => 107,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            322 => 
            array (
                'id' => 388,
                'product_id' => 108,
                'color' => 'SILVER',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            323 => 
            array (
                'id' => 389,
                'product_id' => 109,
                'color' => 'WHITE',
                'size' => '82R',
                'price_component_id' => NULL,
            ),
            324 => 
            array (
                'id' => 390,
                'product_id' => 110,
                'color' => 'WHITE',
                'size' => '87R',
                'price_component_id' => NULL,
            ),
            325 => 
            array (
                'id' => 391,
                'product_id' => 111,
                'color' => 'WHITE',
                'size' => '92R',
                'price_component_id' => NULL,
            ),
            326 => 
            array (
                'id' => 392,
                'product_id' => 112,
                'color' => 'WHITE',
                'size' => '97R',
                'price_component_id' => NULL,
            ),
            327 => 
            array (
                'id' => 393,
                'product_id' => 113,
                'color' => 'WHITE',
                'size' => '102R',
                'price_component_id' => NULL,
            ),
            328 => 
            array (
                'id' => 394,
                'product_id' => 114,
                'color' => 'WHITE',
                'size' => '107R',
                'price_component_id' => NULL,
            ),
            329 => 
            array (
                'id' => 395,
                'product_id' => 115,
                'color' => 'WHITE',
                'size' => '112R',
                'price_component_id' => NULL,
            ),
            330 => 
            array (
                'id' => 396,
                'product_id' => 116,
                'color' => 'WHITE',
                'size' => '117R',
                'price_component_id' => NULL,
            ),
            331 => 
            array (
                'id' => 397,
                'product_id' => 117,
                'color' => 'WHITE',
                'size' => '122R',
                'price_component_id' => NULL,
            ),
            332 => 
            array (
                'id' => 398,
                'product_id' => 118,
                'color' => 'WHITE',
                'size' => '127R',
                'price_component_id' => NULL,
            ),
            333 => 
            array (
                'id' => 399,
                'product_id' => 119,
                'color' => 'WHITE',
                'size' => '132R',
                'price_component_id' => NULL,
            ),
            334 => 
            array (
                'id' => 400,
                'product_id' => 120,
                'color' => 'WHITE',
                'size' => '28X46X50MIC',
                'price_component_id' => NULL,
            ),
            335 => 
            array (
                'id' => 401,
                'product_id' => 121,
                'color' => 'YELLOW/SILVER/YELLOW',
                'size' => '50MM',
                'price_component_id' => NULL,
            ),
            336 => 
            array (
                'id' => 402,
                'product_id' => 122,
                'color' => 'WHITE',
                'size' => '77R',
                'price_component_id' => NULL,
            ),
            337 => 
            array (
                'id' => 403,
                'product_id' => 123,
                'color' => 'WHITE',
                'size' => '82R',
                'price_component_id' => NULL,
            ),
            338 => 
            array (
                'id' => 404,
                'product_id' => 124,
                'color' => 'WHITE',
                'size' => '87R',
                'price_component_id' => NULL,
            ),
            339 => 
            array (
                'id' => 405,
                'product_id' => 125,
                'color' => 'WHITE',
                'size' => '92R',
                'price_component_id' => NULL,
            ),
            340 => 
            array (
                'id' => 406,
                'product_id' => 126,
                'color' => 'WHITE',
                'size' => '97R',
                'price_component_id' => NULL,
            ),
            341 => 
            array (
                'id' => 407,
                'product_id' => 127,
                'color' => 'WHITE',
                'size' => '102R',
                'price_component_id' => NULL,
            ),
            342 => 
            array (
                'id' => 408,
                'product_id' => 128,
                'color' => 'WHITE',
                'size' => '107R',
                'price_component_id' => NULL,
            ),
            343 => 
            array (
                'id' => 409,
                'product_id' => 129,
                'color' => 'WHITE',
                'size' => '112R',
                'price_component_id' => NULL,
            ),
            344 => 
            array (
                'id' => 410,
                'product_id' => 130,
                'color' => 'WHITE',
                'size' => '117R',
                'price_component_id' => NULL,
            ),
            345 => 
            array (
                'id' => 411,
                'product_id' => 131,
                'color' => 'WHITE',
                'size' => '122R',
                'price_component_id' => NULL,
            ),
            346 => 
            array (
                'id' => 412,
                'product_id' => 132,
                'color' => 'WHITE',
                'size' => '127R',
                'price_component_id' => NULL,
            ),
            347 => 
            array (
                'id' => 413,
                'product_id' => 133,
                'color' => 'WHITE',
                'size' => '132R',
                'price_component_id' => NULL,
            ),
            348 => 
            array (
                'id' => 414,
                'product_id' => 134,
                'color' => 'YELLOW',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            349 => 
            array (
                'id' => 415,
                'product_id' => 135,
                'color' => 'BLACK',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            350 => 
            array (
                'id' => 416,
                'product_id' => 136,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            351 => 
            array (
                'id' => 417,
                'product_id' => 137,
                'color' => 'BLACK',
                'size' => '25MM',
                'price_component_id' => NULL,
            ),
            352 => 
            array (
                'id' => 418,
                'product_id' => 138,
                'color' => 'BLACK',
                'size' => '25MM',
                'price_component_id' => NULL,
            ),
            353 => 
            array (
                'id' => 419,
                'product_id' => 139,
                'color' => 'BLACK',
                'size' => '50MM',
                'price_component_id' => NULL,
            ),
            354 => 
            array (
                'id' => 420,
                'product_id' => 140,
                'color' => 'BLACK',
                'size' => '20MM',
                'price_component_id' => NULL,
            ),
            355 => 
            array (
                'id' => 421,
                'product_id' => 141,
                'color' => 'BLACK',
                'size' => '77',
                'price_component_id' => NULL,
            ),
            356 => 
            array (
                'id' => 422,
                'product_id' => 141,
                'color' => 'BLACK',
                'size' => '82',
                'price_component_id' => NULL,
            ),
            357 => 
            array (
                'id' => 423,
                'product_id' => 141,
                'color' => 'BLACK',
            'size' => '87 (55CM)',
                'price_component_id' => NULL,
            ),
            358 => 
            array (
                'id' => 424,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '92',
                'price_component_id' => NULL,
            ),
            359 => 
            array (
                'id' => 425,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '97',
                'price_component_id' => NULL,
            ),
            360 => 
            array (
                'id' => 426,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '102',
                'price_component_id' => NULL,
            ),
            361 => 
            array (
                'id' => 427,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '107',
                'price_component_id' => NULL,
            ),
            362 => 
            array (
                'id' => 428,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '112',
                'price_component_id' => NULL,
            ),
            363 => 
            array (
                'id' => 429,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '117',
                'price_component_id' => NULL,
            ),
            364 => 
            array (
                'id' => 430,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '122',
                'price_component_id' => NULL,
            ),
            365 => 
            array (
                'id' => 431,
                'product_id' => 142,
                'color' => 'BLACK',
                'size' => '127',
                'price_component_id' => NULL,
            ),
            366 => 
            array (
                'id' => 432,
                'product_id' => 142,
                'color' => 'BLACK',
            'size' => '132 (60CM)',
                'price_component_id' => NULL,
            ),
            367 => 
            array (
                'id' => 433,
                'product_id' => 143,
                'color' => 'YELLOW',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            368 => 
            array (
                'id' => 434,
                'product_id' => 144,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            369 => 
            array (
                'id' => 435,
                'product_id' => 145,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            370 => 
            array (
                'id' => 436,
                'product_id' => 146,
                'color' => 'NAVY',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            371 => 
            array (
                'id' => 437,
                'product_id' => 147,
                'color' => 'SILVER RED',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            372 => 
            array (
                'id' => 438,
                'product_id' => 148,
                'color' => 'BROWN',
                'size' => '680X440X255MM',
                'price_component_id' => NULL,
            ),
            373 => 
            array (
                'id' => 439,
                'product_id' => 149,
                'color' => 'WHITE',
                'size' => '25MM',
                'price_component_id' => NULL,
            ),
            374 => 
            array (
                'id' => 440,
                'product_id' => 150,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            375 => 
            array (
                'id' => 441,
                'product_id' => 151,
                'color' => 'SILVER',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            376 => 
            array (
                'id' => 442,
                'product_id' => 152,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            377 => 
            array (
                'id' => 443,
                'product_id' => 153,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            378 => 
            array (
                'id' => 444,
                'product_id' => 154,
                'color' => 'SILVER',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            379 => 
            array (
                'id' => 445,
                'product_id' => 155,
                'color' => 'WHITE',
                'size' => '28X46X50MIC',
                'price_component_id' => NULL,
            ),
            380 => 
            array (
                'id' => 446,
                'product_id' => 156,
                'color' => 'WHITE',
                'size' => '8R',
                'price_component_id' => NULL,
            ),
            381 => 
            array (
                'id' => 447,
                'product_id' => 157,
                'color' => 'WHITE',
                'size' => '10R',
                'price_component_id' => NULL,
            ),
            382 => 
            array (
                'id' => 448,
                'product_id' => 158,
                'color' => 'WHITE',
                'size' => '12R',
                'price_component_id' => NULL,
            ),
            383 => 
            array (
                'id' => 449,
                'product_id' => 159,
                'color' => 'WHITE',
                'size' => '14R',
                'price_component_id' => NULL,
            ),
            384 => 
            array (
                'id' => 450,
                'product_id' => 160,
                'color' => 'WHITE',
                'size' => '16R',
                'price_component_id' => NULL,
            ),
            385 => 
            array (
                'id' => 451,
                'product_id' => 161,
                'color' => 'WHITE',
                'size' => '18R',
                'price_component_id' => NULL,
            ),
            386 => 
            array (
                'id' => 452,
                'product_id' => 162,
                'color' => 'YELLOW SILVER',
                'size' => '50MM',
                'price_component_id' => NULL,
            ),
            387 => 
            array (
                'id' => 453,
                'product_id' => 163,
                'color' => 'WHITE',
                'size' => '8R',
                'price_component_id' => NULL,
            ),
            388 => 
            array (
                'id' => 454,
                'product_id' => 164,
                'color' => 'WHITE',
                'size' => '10R',
                'price_component_id' => NULL,
            ),
            389 => 
            array (
                'id' => 455,
                'product_id' => 165,
                'color' => 'WHITE',
                'size' => '12R',
                'price_component_id' => NULL,
            ),
            390 => 
            array (
                'id' => 456,
                'product_id' => 166,
                'color' => 'WHITE',
                'size' => '14R',
                'price_component_id' => NULL,
            ),
            391 => 
            array (
                'id' => 457,
                'product_id' => 167,
                'color' => 'WHITE',
                'size' => '16R',
                'price_component_id' => NULL,
            ),
            392 => 
            array (
                'id' => 458,
                'product_id' => 168,
                'color' => 'WHITE',
                'size' => '18R',
                'price_component_id' => NULL,
            ),
            393 => 
            array (
                'id' => 459,
                'product_id' => 169,
                'color' => 'WHITE',
                'size' => '20R',
                'price_component_id' => NULL,
            ),
            394 => 
            array (
                'id' => 460,
                'product_id' => 170,
                'color' => 'YELLOW',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            395 => 
            array (
                'id' => 461,
                'product_id' => 171,
                'color' => 'BLACK',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            396 => 
            array (
                'id' => 462,
                'product_id' => 172,
                'color' => 'WHITE',
                'size' => '0',
                'price_component_id' => NULL,
            ),
            397 => 
            array (
                'id' => 463,
                'product_id' => 74,
                'color' => 'Navy',
                'size' => '20/2',
                'price_component_id' => NULL,
            ),
            398 => 
            array (
                'id' => 464,
                'product_id' => 73,
                'color' => 'Navy',
                'size' => '20/3',
                'price_component_id' => NULL,
            ),
            399 => 
            array (
                'id' => 465,
                'product_id' => 54,
                'color' => 'NAVY',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            400 => 
            array (
                'id' => 466,
                'product_id' => 56,
                'color' => 'NAVY',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            401 => 
            array (
                'id' => 467,
                'product_id' => 173,
                'color' => 'NAVY',
                'size' => '6',
                'price_component_id' => NULL,
            ),
            402 => 
            array (
                'id' => 468,
                'product_id' => 174,
                'color' => 'NAVY',
                'size' => '6',
                'price_component_id' => NULL,
            ),
            403 => 
            array (
                'id' => 469,
                'product_id' => 175,
                'color' => 'NAVY',
                'size' => '10',
                'price_component_id' => NULL,
            ),
            404 => 
            array (
                'id' => 470,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '94L',
                'price_component_id' => NULL,
            ),
            405 => 
            array (
                'id' => 471,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            406 => 
            array (
                'id' => 472,
                'product_id' => 178,
                'color' => 'BLACK',
                'size' => '50MM',
                'price_component_id' => NULL,
            ),
            407 => 
            array (
                'id' => 473,
                'product_id' => 179,
                'color' => 'BLACK',
                'size' => '20MM',
                'price_component_id' => NULL,
            ),
            408 => 
            array (
                'id' => 474,
                'product_id' => 180,
                'color' => 'BLACK',
                'size' => '25MM',
                'price_component_id' => NULL,
            ),
            409 => 
            array (
                'id' => 475,
                'product_id' => 181,
                'color' => 'BLACK',
                'size' => '50MM',
                'price_component_id' => NULL,
            ),
            410 => 
            array (
                'id' => 476,
                'product_id' => 182,
                'color' => 'BLACK',
                'size' => '20MM',
                'price_component_id' => NULL,
            ),
            411 => 
            array (
                'id' => 477,
                'product_id' => 183,
                'color' => 'BLACK',
                'size' => 'SIZE 8',
                'price_component_id' => NULL,
            ),
            412 => 
            array (
                'id' => 478,
                'product_id' => 183,
                'color' => 'BLACK',
                'size' => '10',
                'price_component_id' => NULL,
            ),
            413 => 
            array (
                'id' => 479,
                'product_id' => 183,
                'color' => 'BLACK',
                'size' => '12',
                'price_component_id' => NULL,
            ),
            414 => 
            array (
                'id' => 480,
                'product_id' => 184,
                'color' => 'BLACK',
                'size' => 'SIZE 14',
                'price_component_id' => NULL,
            ),
            415 => 
            array (
                'id' => 481,
                'product_id' => 184,
                'color' => 'BLACK',
                'size' => '16',
                'price_component_id' => NULL,
            ),
            416 => 
            array (
                'id' => 482,
                'product_id' => 184,
                'color' => 'BLACK',
                'size' => '18',
                'price_component_id' => NULL,
            ),
            417 => 
            array (
                'id' => 483,
                'product_id' => 184,
                'color' => 'BLACK',
                'size' => '20',
                'price_component_id' => NULL,
            ),
            418 => 
            array (
                'id' => 484,
                'product_id' => 185,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            419 => 
            array (
                'id' => 485,
                'product_id' => 186,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            420 => 
            array (
                'id' => 486,
                'product_id' => 187,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            421 => 
            array (
                'id' => 487,
                'product_id' => 188,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            422 => 
            array (
                'id' => 488,
                'product_id' => 189,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            423 => 
            array (
                'id' => 489,
                'product_id' => 190,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            424 => 
            array (
                'id' => 490,
                'product_id' => 191,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            425 => 
            array (
                'id' => 491,
                'product_id' => 192,
                'color' => '1',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            426 => 
            array (
                'id' => 492,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            427 => 
            array (
                'id' => 493,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            428 => 
            array (
                'id' => 494,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            429 => 
            array (
                'id' => 495,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            430 => 
            array (
                'id' => 496,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '35',
                'price_component_id' => NULL,
            ),
            431 => 
            array (
                'id' => 497,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            432 => 
            array (
                'id' => 498,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            433 => 
            array (
                'id' => 499,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            434 => 
            array (
                'id' => 500,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            435 => 
            array (
                'id' => 501,
                'product_id' => 177,
                'color' => 'WHITE',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            436 => 
            array (
                'id' => 513,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            437 => 
            array (
                'id' => 515,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            438 => 
            array (
                'id' => 516,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '35',
                'price_component_id' => NULL,
            ),
            439 => 
            array (
                'id' => 517,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            440 => 
            array (
                'id' => 518,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            441 => 
            array (
                'id' => 519,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            442 => 
            array (
                'id' => 520,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            443 => 
            array (
                'id' => 521,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            444 => 
            array (
                'id' => 523,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            445 => 
            array (
                'id' => 525,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            446 => 
            array (
                'id' => 527,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            447 => 
            array (
                'id' => 528,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            448 => 
            array (
                'id' => 529,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            449 => 
            array (
                'id' => 530,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            450 => 
            array (
                'id' => 531,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            451 => 
            array (
                'id' => 532,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            452 => 
            array (
                'id' => 533,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            453 => 
            array (
                'id' => 534,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            454 => 
            array (
                'id' => 535,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '35',
                'price_component_id' => NULL,
            ),
            455 => 
            array (
                'id' => 536,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '35',
                'price_component_id' => NULL,
            ),
            456 => 
            array (
                'id' => 537,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            457 => 
            array (
                'id' => 538,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            458 => 
            array (
                'id' => 539,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            459 => 
            array (
                'id' => 540,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            460 => 
            array (
                'id' => 541,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            461 => 
            array (
                'id' => 542,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            462 => 
            array (
                'id' => 543,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            463 => 
            array (
                'id' => 544,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            464 => 
            array (
                'id' => 545,
                'product_id' => 194,
                'color' => 'WHITE',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            465 => 
            array (
                'id' => 546,
                'product_id' => 194,
                'color' => 'MARITIME',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            466 => 
            array (
                'id' => 547,
                'product_id' => 195,
                'color' => 'WHITE',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            467 => 
            array (
                'id' => 548,
                'product_id' => 195,
                'color' => 'MARITIME',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            468 => 
            array (
                'id' => 549,
                'product_id' => 195,
                'color' => 'WHITE',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            469 => 
            array (
                'id' => 550,
                'product_id' => 195,
                'color' => 'MARITIME',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            470 => 
            array (
                'id' => 551,
                'product_id' => 195,
                'color' => 'WHITE',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            471 => 
            array (
                'id' => 552,
                'product_id' => 195,
                'color' => 'MARITIME',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            472 => 
            array (
                'id' => 553,
                'product_id' => 195,
                'color' => 'WHITE',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            473 => 
            array (
                'id' => 554,
                'product_id' => 195,
                'color' => 'MARITIME',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            474 => 
            array (
                'id' => 555,
                'product_id' => 195,
                'color' => 'WHITE',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            475 => 
            array (
                'id' => 556,
                'product_id' => 195,
                'color' => 'MARITIME',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            476 => 
            array (
                'id' => 557,
                'product_id' => 195,
                'color' => 'WHITE',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            477 => 
            array (
                'id' => 558,
                'product_id' => 195,
                'color' => 'MARITIME',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            478 => 
            array (
                'id' => 559,
                'product_id' => 196,
                'color' => 'BLACK',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            479 => 
            array (
                'id' => 560,
                'product_id' => 196,
                'color' => 'BLEACHED SAND',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            480 => 
            array (
                'id' => 561,
                'product_id' => 196,
                'color' => 'MARITIME',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            481 => 
            array (
                'id' => 562,
                'product_id' => 196,
                'color' => 'BLACK',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            482 => 
            array (
                'id' => 563,
                'product_id' => 196,
                'color' => 'BLEACHED SAND',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            483 => 
            array (
                'id' => 564,
                'product_id' => 196,
                'color' => 'MARITIME',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            484 => 
            array (
                'id' => 565,
                'product_id' => 196,
                'color' => 'BLACK',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            485 => 
            array (
                'id' => 566,
                'product_id' => 196,
                'color' => 'BLEACHED SAND',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            486 => 
            array (
                'id' => 567,
                'product_id' => 196,
                'color' => 'MARITIME',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            487 => 
            array (
                'id' => 568,
                'product_id' => 196,
                'color' => 'BLACK',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            488 => 
            array (
                'id' => 569,
                'product_id' => 196,
                'color' => 'BLEACHED SAND',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            489 => 
            array (
                'id' => 570,
                'product_id' => 196,
                'color' => 'MARITIME',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            490 => 
            array (
                'id' => 571,
                'product_id' => 196,
                'color' => 'BLACK',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            491 => 
            array (
                'id' => 572,
                'product_id' => 196,
                'color' => 'BLEACHED SAND',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            492 => 
            array (
                'id' => 573,
                'product_id' => 196,
                'color' => 'MARITIME',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            493 => 
            array (
                'id' => 574,
                'product_id' => 196,
                'color' => 'BLACK',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            494 => 
            array (
                'id' => 575,
                'product_id' => 196,
                'color' => 'BLEACHED SAND',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            495 => 
            array (
                'id' => 576,
                'product_id' => 196,
                'color' => 'MARITIME',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            496 => 
            array (
                'id' => 577,
                'product_id' => 197,
                'color' => 'BLACK',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            497 => 
            array (
                'id' => 578,
                'product_id' => 197,
                'color' => 'BLEACHED SAND',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            498 => 
            array (
                'id' => 579,
                'product_id' => 197,
                'color' => 'MARITIME',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            499 => 
            array (
                'id' => 580,
                'product_id' => 197,
                'color' => 'BLACK',
                'size' => '46',
                'price_component_id' => NULL,
            ),
        ));
        \DB::table('product_feature')->insert(array (
            0 => 
            array (
                'id' => 581,
                'product_id' => 197,
                'color' => 'BLEACHED SAND',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            1 => 
            array (
                'id' => 582,
                'product_id' => 197,
                'color' => 'MARITIME',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            2 => 
            array (
                'id' => 583,
                'product_id' => 197,
                'color' => 'BLACK',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            3 => 
            array (
                'id' => 584,
                'product_id' => 197,
                'color' => 'BLEACHED SAND',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            4 => 
            array (
                'id' => 585,
                'product_id' => 197,
                'color' => 'MARITIME',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            5 => 
            array (
                'id' => 586,
                'product_id' => 197,
                'color' => 'BLACK',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            6 => 
            array (
                'id' => 587,
                'product_id' => 197,
                'color' => 'BLEACHED SAND',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            7 => 
            array (
                'id' => 588,
                'product_id' => 197,
                'color' => 'MARITIME',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            8 => 
            array (
                'id' => 589,
                'product_id' => 197,
                'color' => 'BLACK',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            9 => 
            array (
                'id' => 590,
                'product_id' => 197,
                'color' => 'BLEACHED SAND',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            10 => 
            array (
                'id' => 591,
                'product_id' => 197,
                'color' => 'MARITIME',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            11 => 
            array (
                'id' => 592,
                'product_id' => 197,
                'color' => 'BLACK',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            12 => 
            array (
                'id' => 593,
                'product_id' => 197,
                'color' => 'BLEACHED SAND',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            13 => 
            array (
                'id' => 594,
                'product_id' => 197,
                'color' => 'MARITIME',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            14 => 
            array (
                'id' => 595,
                'product_id' => 198,
                'color' => 'BLACK',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            15 => 
            array (
                'id' => 596,
                'product_id' => 198,
                'color' => 'BLEACHED SAND',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            16 => 
            array (
                'id' => 597,
                'product_id' => 198,
                'color' => 'MARITIME',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            17 => 
            array (
                'id' => 598,
                'product_id' => 198,
                'color' => 'BLACK',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            18 => 
            array (
                'id' => 599,
                'product_id' => 198,
                'color' => 'BLEACHED SAND',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            19 => 
            array (
                'id' => 600,
                'product_id' => 198,
                'color' => 'MARITIME',
                'size' => '46',
                'price_component_id' => NULL,
            ),
            20 => 
            array (
                'id' => 602,
                'product_id' => 198,
                'color' => 'BLEACHED SAND',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            21 => 
            array (
                'id' => 603,
                'product_id' => 198,
                'color' => 'MARITIME',
                'size' => '48',
                'price_component_id' => NULL,
            ),
            22 => 
            array (
                'id' => 605,
                'product_id' => 198,
                'color' => 'BLEACHED SAND',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            23 => 
            array (
                'id' => 606,
                'product_id' => 198,
                'color' => 'MARITIME',
                'size' => '50',
                'price_component_id' => NULL,
            ),
            24 => 
            array (
                'id' => 608,
                'product_id' => 198,
                'color' => 'BLEACHED SAND',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            25 => 
            array (
                'id' => 609,
                'product_id' => 198,
                'color' => 'MARITIME',
                'size' => '52',
                'price_component_id' => NULL,
            ),
            26 => 
            array (
                'id' => 611,
                'product_id' => 198,
                'color' => 'BLEACHED SAND',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            27 => 
            array (
                'id' => 612,
                'product_id' => 198,
                'color' => 'MARITIME',
                'size' => '54',
                'price_component_id' => NULL,
            ),
            28 => 
            array (
                'id' => 613,
                'product_id' => 199,
                'color' => 'BLACK',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            29 => 
            array (
                'id' => 614,
                'product_id' => 199,
                'color' => 'BLEACHED SAND',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            30 => 
            array (
                'id' => 615,
                'product_id' => 199,
                'color' => 'MARITIME',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            31 => 
            array (
                'id' => 616,
                'product_id' => 199,
                'color' => 'BLACK',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            32 => 
            array (
                'id' => 617,
                'product_id' => 199,
                'color' => 'BLEACHED SAND',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            33 => 
            array (
                'id' => 618,
                'product_id' => 199,
                'color' => 'MARITIME',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            34 => 
            array (
                'id' => 619,
                'product_id' => 199,
                'color' => 'BLACK',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            35 => 
            array (
                'id' => 620,
                'product_id' => 199,
                'color' => 'BLEACHED SAND',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            36 => 
            array (
                'id' => 621,
                'product_id' => 199,
                'color' => 'MARITIME',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            37 => 
            array (
                'id' => 622,
                'product_id' => 199,
                'color' => 'BLACK',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            38 => 
            array (
                'id' => 623,
                'product_id' => 199,
                'color' => 'BLEACHED SAND',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            39 => 
            array (
                'id' => 624,
                'product_id' => 199,
                'color' => 'MARITIME',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            40 => 
            array (
                'id' => 625,
                'product_id' => 199,
                'color' => 'BLACK',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            41 => 
            array (
                'id' => 627,
                'product_id' => 199,
                'color' => 'MARITIME',
                'size' => '44',
                'price_component_id' => NULL,
            ),
            42 => 
            array (
                'id' => 628,
                'product_id' => 200,
                'color' => 'BLACK',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            43 => 
            array (
                'id' => 629,
                'product_id' => 200,
                'color' => 'BLEACHED SAND',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            44 => 
            array (
                'id' => 630,
                'product_id' => 200,
                'color' => 'BLACK',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            45 => 
            array (
                'id' => 631,
                'product_id' => 200,
                'color' => 'BLEACHED SAND',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            46 => 
            array (
                'id' => 632,
                'product_id' => 200,
                'color' => 'BLACK',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            47 => 
            array (
                'id' => 633,
                'product_id' => 200,
                'color' => 'BLEACHED SAND',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            48 => 
            array (
                'id' => 634,
                'product_id' => 200,
                'color' => 'BLACK',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            49 => 
            array (
                'id' => 635,
                'product_id' => 200,
                'color' => 'BLEACHED SAND',
                'size' => '42',
                'price_component_id' => NULL,
            ),
            50 => 
            array (
                'id' => 636,
                'product_id' => 177,
                'color' => 'MARITIME',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            51 => 
            array (
                'id' => 637,
                'product_id' => 234,
                'color' => '-',
                'size' => '-',
                'price_component_id' => NULL,
            ),
            52 => 
            array (
                'id' => 641,
                'product_id' => 236,
                'color' => 'NAVY',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            53 => 
            array (
                'id' => 642,
                'product_id' => 236,
                'color' => 'NAVY',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            54 => 
            array (
                'id' => 643,
                'product_id' => 236,
                'color' => 'NAVY',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            55 => 
            array (
                'id' => 644,
                'product_id' => 237,
                'color' => 'ABU MUDA',
                'size' => 'S',
                'price_component_id' => NULL,
            ),
            56 => 
            array (
                'id' => 645,
                'product_id' => 237,
                'color' => 'ABU MUDA',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            57 => 
            array (
                'id' => 646,
                'product_id' => 237,
                'color' => 'ABU MUDA',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            58 => 
            array (
                'id' => 647,
                'product_id' => 237,
                'color' => 'ABU MUDA',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            59 => 
            array (
                'id' => 648,
                'product_id' => 238,
                'color' => '0025 A/ABU',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            60 => 
            array (
                'id' => 649,
                'product_id' => 238,
                'color' => '0025 A/ABU',
                'size' => 'XXXL',
                'price_component_id' => NULL,
            ),
            61 => 
            array (
                'id' => 650,
                'product_id' => 238,
                'color' => '0025A/ABU',
                'size' => 'XXXXL',
                'price_component_id' => NULL,
            ),
            62 => 
            array (
                'id' => 651,
                'product_id' => 239,
                'color' => '41234 / ABU TUA',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            63 => 
            array (
                'id' => 652,
                'product_id' => 239,
                'color' => '41234 / ABU TUA',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            64 => 
            array (
                'id' => 653,
                'product_id' => 239,
                'color' => '41234 / ABU TUA',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            65 => 
            array (
                'id' => 654,
                'product_id' => 240,
                'color' => 'NAVY',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            66 => 
            array (
                'id' => 655,
                'product_id' => 240,
                'color' => 'NAVY',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            67 => 
            array (
                'id' => 656,
                'product_id' => 240,
                'color' => 'NAVY',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            68 => 
            array (
                'id' => 657,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '117R',
                'price_component_id' => NULL,
            ),
            69 => 
            array (
                'id' => 658,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '107S',
                'price_component_id' => NULL,
            ),
            70 => 
            array (
                'id' => 659,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '112S',
                'price_component_id' => NULL,
            ),
            71 => 
            array (
                'id' => 660,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '102S',
                'price_component_id' => NULL,
            ),
            72 => 
            array (
                'id' => 661,
                'product_id' => 173,
                'color' => 'NAVY',
                'size' => '8',
                'price_component_id' => NULL,
            ),
            73 => 
            array (
                'id' => 662,
                'product_id' => 173,
                'color' => 'NAVY',
                'size' => '10',
                'price_component_id' => NULL,
            ),
            74 => 
            array (
                'id' => 663,
                'product_id' => 173,
                'color' => 'NAVY',
                'size' => '12',
                'price_component_id' => NULL,
            ),
            75 => 
            array (
                'id' => 664,
                'product_id' => 173,
                'color' => 'NAVY',
                'size' => '14',
                'price_component_id' => NULL,
            ),
            76 => 
            array (
                'id' => 665,
                'product_id' => 173,
                'color' => 'NAVY',
                'size' => '18',
                'price_component_id' => NULL,
            ),
            77 => 
            array (
                'id' => 666,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '82R',
                'price_component_id' => NULL,
            ),
            78 => 
            array (
                'id' => 667,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '87R',
                'price_component_id' => NULL,
            ),
            79 => 
            array (
                'id' => 668,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '92R',
                'price_component_id' => NULL,
            ),
            80 => 
            array (
                'id' => 669,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '97R',
                'price_component_id' => NULL,
            ),
            81 => 
            array (
                'id' => 670,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '87S',
                'price_component_id' => NULL,
            ),
            82 => 
            array (
                'id' => 671,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '92S',
                'price_component_id' => NULL,
            ),
            83 => 
            array (
                'id' => 672,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '97S',
                'price_component_id' => NULL,
            ),
            84 => 
            array (
                'id' => 673,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '102S',
                'price_component_id' => NULL,
            ),
            85 => 
            array (
                'id' => 674,
                'product_id' => 176,
                'color' => 'GREY',
                'size' => '117S',
                'price_component_id' => NULL,
            ),
            86 => 
            array (
                'id' => 676,
                'product_id' => 175,
                'color' => 'NAVY',
                'size' => '12',
                'price_component_id' => NULL,
            ),
            87 => 
            array (
                'id' => 677,
                'product_id' => 175,
                'color' => 'NAVY',
                'size' => '14',
                'price_component_id' => NULL,
            ),
            88 => 
            array (
                'id' => 678,
                'product_id' => 175,
                'color' => 'NAVY',
                'size' => '16',
                'price_component_id' => NULL,
            ),
            89 => 
            array (
                'id' => 679,
                'product_id' => 175,
                'color' => 'NAVY',
                'size' => '18',
                'price_component_id' => NULL,
            ),
            90 => 
            array (
                'id' => 680,
                'product_id' => 175,
                'color' => 'NAVY',
                'size' => '20',
                'price_component_id' => NULL,
            ),
            91 => 
            array (
                'id' => 681,
                'product_id' => 174,
                'color' => 'NAVY',
                'size' => '8',
                'price_component_id' => NULL,
            ),
            92 => 
            array (
                'id' => 682,
                'product_id' => 174,
                'color' => 'NAVY',
                'size' => '10',
                'price_component_id' => NULL,
            ),
            93 => 
            array (
                'id' => 683,
                'product_id' => 174,
                'color' => 'NAVY',
                'size' => '12',
                'price_component_id' => NULL,
            ),
            94 => 
            array (
                'id' => 684,
                'product_id' => 174,
                'color' => 'NAVY',
                'size' => '18',
                'price_component_id' => NULL,
            ),
        ));
        
        
    }
}