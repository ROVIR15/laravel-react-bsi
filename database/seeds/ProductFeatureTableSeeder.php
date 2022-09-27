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
                'size' => '92S',
                'price_component_id' => NULL,
            ),
            32 => 
            array (
                'id' => 51,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '87S',
                'price_component_id' => NULL,
            ),
            33 => 
            array (
                'id' => 52,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '97R',
                'price_component_id' => NULL,
            ),
            34 => 
            array (
                'id' => 53,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '82R',
                'price_component_id' => NULL,
            ),
            35 => 
            array (
                'id' => 54,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '107R',
                'price_component_id' => NULL,
            ),
            36 => 
            array (
                'id' => 55,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '102S',
                'price_component_id' => NULL,
            ),
            37 => 
            array (
                'id' => 56,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '92R',
                'price_component_id' => NULL,
            ),
            38 => 
            array (
                'id' => 57,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '94L',
                'price_component_id' => NULL,
            ),
            39 => 
            array (
                'id' => 58,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '82S',
                'price_component_id' => NULL,
            ),
            40 => 
            array (
                'id' => 59,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '89L',
                'price_component_id' => NULL,
            ),
            41 => 
            array (
                'id' => 60,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '87R',
                'price_component_id' => NULL,
            ),
            42 => 
            array (
                'id' => 61,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '102R',
                'price_component_id' => NULL,
            ),
            43 => 
            array (
                'id' => 62,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '77R',
                'price_component_id' => NULL,
            ),
            44 => 
            array (
                'id' => 63,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '84L',
                'price_component_id' => NULL,
            ),
            45 => 
            array (
                'id' => 64,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '99L',
                'price_component_id' => NULL,
            ),
            46 => 
            array (
                'id' => 65,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '107S',
                'price_component_id' => NULL,
            ),
            47 => 
            array (
                'id' => 66,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '97S',
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
                'size' => '37',
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
        ));
        
        
    }
}