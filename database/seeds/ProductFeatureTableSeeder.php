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
                'id' => 18,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            10 => 
            array (
                'id' => 19,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            11 => 
            array (
                'id' => 20,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            12 => 
            array (
                'id' => 21,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            13 => 
            array (
                'id' => 22,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            14 => 
            array (
                'id' => 23,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            15 => 
            array (
                'id' => 24,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            16 => 
            array (
                'id' => 25,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            17 => 
            array (
                'id' => 26,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            18 => 
            array (
                'id' => 27,
                'product_id' => 6,
                'color' => 'Black',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            19 => 
            array (
                'id' => 28,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            20 => 
            array (
                'id' => 29,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            21 => 
            array (
                'id' => 30,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            22 => 
            array (
                'id' => 31,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            23 => 
            array (
                'id' => 32,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            24 => 
            array (
                'id' => 33,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            25 => 
            array (
                'id' => 34,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            26 => 
            array (
                'id' => 35,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            27 => 
            array (
                'id' => 36,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            28 => 
            array (
                'id' => 37,
                'product_id' => 7,
                'color' => 'Black',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            29 => 
            array (
                'id' => 38,
                'product_id' => 7,
                'color' => 'Khaky',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            30 => 
            array (
                'id' => 39,
                'product_id' => 7,
                'color' => 'Olive',
                'size' => 'XXL',
                'price_component_id' => NULL,
            ),
            31 => 
            array (
                'id' => 40,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            32 => 
            array (
                'id' => 41,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            33 => 
            array (
                'id' => 42,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            34 => 
            array (
                'id' => 43,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            35 => 
            array (
                'id' => 44,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            36 => 
            array (
                'id' => 45,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            37 => 
            array (
                'id' => 46,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            38 => 
            array (
                'id' => 47,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            39 => 
            array (
                'id' => 48,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            40 => 
            array (
                'id' => 49,
                'product_id' => 8,
                'color' => 'Black',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            41 => 
            array (
                'id' => 50,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '92S',
                'price_component_id' => NULL,
            ),
            42 => 
            array (
                'id' => 51,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '87S',
                'price_component_id' => NULL,
            ),
            43 => 
            array (
                'id' => 52,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '97R',
                'price_component_id' => NULL,
            ),
            44 => 
            array (
                'id' => 53,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '82R',
                'price_component_id' => NULL,
            ),
            45 => 
            array (
                'id' => 54,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '107R',
                'price_component_id' => NULL,
            ),
            46 => 
            array (
                'id' => 55,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '102S',
                'price_component_id' => NULL,
            ),
            47 => 
            array (
                'id' => 56,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '92R',
                'price_component_id' => NULL,
            ),
            48 => 
            array (
                'id' => 57,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '94L',
                'price_component_id' => NULL,
            ),
            49 => 
            array (
                'id' => 58,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '82S',
                'price_component_id' => NULL,
            ),
            50 => 
            array (
                'id' => 59,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '89L',
                'price_component_id' => NULL,
            ),
            51 => 
            array (
                'id' => 60,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '87R',
                'price_component_id' => NULL,
            ),
            52 => 
            array (
                'id' => 61,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '102R',
                'price_component_id' => NULL,
            ),
            53 => 
            array (
                'id' => 62,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '77R',
                'price_component_id' => NULL,
            ),
            54 => 
            array (
                'id' => 63,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '84L',
                'price_component_id' => NULL,
            ),
            55 => 
            array (
                'id' => 64,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '99L',
                'price_component_id' => NULL,
            ),
            56 => 
            array (
                'id' => 65,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '107S',
                'price_component_id' => NULL,
            ),
            57 => 
            array (
                'id' => 66,
                'product_id' => 9,
                'color' => 'Navy',
                'size' => '97S',
                'price_component_id' => NULL,
            ),
            58 => 
            array (
                'id' => 84,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => 'M',
                'price_component_id' => NULL,
            ),
            59 => 
            array (
                'id' => 85,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => 'L',
                'price_component_id' => NULL,
            ),
            60 => 
            array (
                'id' => 86,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => 'XL',
                'price_component_id' => NULL,
            ),
            61 => 
            array (
                'id' => 87,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '2XL',
                'price_component_id' => NULL,
            ),
            62 => 
            array (
                'id' => 88,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '3XL',
                'price_component_id' => NULL,
            ),
            63 => 
            array (
                'id' => 89,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '4XL',
                'price_component_id' => NULL,
            ),
            64 => 
            array (
                'id' => 90,
                'product_id' => 11,
                'color' => 'Navy-Lime',
                'size' => '5XL',
                'price_component_id' => NULL,
            ),
            65 => 
            array (
                'id' => 91,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            66 => 
            array (
                'id' => 92,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            67 => 
            array (
                'id' => 93,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            68 => 
            array (
                'id' => 94,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            69 => 
            array (
                'id' => 95,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            70 => 
            array (
                'id' => 96,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            71 => 
            array (
                'id' => 97,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            72 => 
            array (
                'id' => 98,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '38',
                'price_component_id' => NULL,
            ),
            73 => 
            array (
                'id' => 99,
                'product_id' => 12,
                'color' => 'Abu Kombo Biru',
                'size' => '40',
                'price_component_id' => NULL,
            ),
            74 => 
            array (
                'id' => 100,
                'product_id' => 13,
                'color' => 'Black',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            75 => 
            array (
                'id' => 101,
                'product_id' => 13,
                'color' => 'Khaky',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            76 => 
            array (
                'id' => 102,
                'product_id' => 13,
                'color' => 'Olive',
                'size' => '1',
                'price_component_id' => NULL,
            ),
            77 => 
            array (
                'id' => 103,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '27',
                'price_component_id' => NULL,
            ),
            78 => 
            array (
                'id' => 104,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '28',
                'price_component_id' => NULL,
            ),
            79 => 
            array (
                'id' => 105,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '29',
                'price_component_id' => NULL,
            ),
            80 => 
            array (
                'id' => 106,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '30',
                'price_component_id' => NULL,
            ),
            81 => 
            array (
                'id' => 107,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '31',
                'price_component_id' => NULL,
            ),
            82 => 
            array (
                'id' => 108,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '32',
                'price_component_id' => NULL,
            ),
            83 => 
            array (
                'id' => 109,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '33',
                'price_component_id' => NULL,
            ),
            84 => 
            array (
                'id' => 110,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '34',
                'price_component_id' => NULL,
            ),
            85 => 
            array (
                'id' => 111,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '36',
                'price_component_id' => NULL,
            ),
            86 => 
            array (
                'id' => 112,
                'product_id' => 14,
                'color' => 'Black',
                'size' => '37',
                'price_component_id' => NULL,
            ),
        ));
        
        
    }
}