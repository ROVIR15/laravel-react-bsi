<?php

use Illuminate\Database\Seeder;

class QuoteItemTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('quote_item')->delete();
        
        \DB::table('quote_item')->insert(array (
            0 => 
            array (
                'id' => 4,
                'quote_id' => 2,
                'request_item_id' => NULL,
                'product_feature_id' => 15,
                'qty' => 100,
                'unit_price' => '2000',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 5,
                'quote_id' => 2,
                'request_item_id' => NULL,
                'product_feature_id' => 16,
                'qty' => 100,
                'unit_price' => '2000',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 8,
                'quote_id' => 2,
                'request_item_id' => NULL,
                'product_feature_id' => 17,
                'qty' => 100,
                'unit_price' => '2000',
                'created_at' => NULL,
                'updated_at' => '2022-09-04 15:47:54',
            ),
            3 => 
            array (
                'id' => 9,
                'quote_id' => 3,
                'request_item_id' => NULL,
                'product_feature_id' => 15,
                'qty' => 300,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 10,
                'quote_id' => 3,
                'request_item_id' => NULL,
                'product_feature_id' => 16,
                'qty' => 300,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 11,
                'quote_id' => 3,
                'request_item_id' => NULL,
                'product_feature_id' => 17,
                'qty' => 300,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 12,
                'quote_id' => 4,
                'request_item_id' => NULL,
                'product_feature_id' => 15,
                'qty' => 600,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-04 16:44:05',
            ),
            7 => 
            array (
                'id' => 13,
                'quote_id' => 4,
                'request_item_id' => NULL,
                'product_feature_id' => 16,
                'qty' => 600,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-04 16:44:11',
            ),
            8 => 
            array (
                'id' => 14,
                'quote_id' => 4,
                'request_item_id' => NULL,
                'product_feature_id' => 17,
                'qty' => 600,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-04 16:44:16',
            ),
            9 => 
            array (
                'id' => 19,
                'quote_id' => 5,
                'request_item_id' => NULL,
                'product_feature_id' => 9,
                'qty' => 100,
                'unit_price' => '2000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:54:54',
            ),
            10 => 
            array (
                'id' => 20,
                'quote_id' => 5,
                'request_item_id' => NULL,
                'product_feature_id' => 11,
                'qty' => 100,
                'unit_price' => '2000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:54:54',
            ),
            11 => 
            array (
                'id' => 21,
                'quote_id' => 5,
                'request_item_id' => NULL,
                'product_feature_id' => 12,
                'qty' => 100,
                'unit_price' => '2000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:54:54',
            ),
            12 => 
            array (
                'id' => 22,
                'quote_id' => 5,
                'request_item_id' => NULL,
                'product_feature_id' => 10,
                'qty' => 100,
                'unit_price' => '2000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:54:54',
            ),
            13 => 
            array (
                'id' => 23,
                'quote_id' => 6,
                'request_item_id' => NULL,
                'product_feature_id' => 84,
                'qty' => 100,
                'unit_price' => '59322',
                'created_at' => NULL,
                'updated_at' => '2022-09-09 02:48:39',
            ),
            14 => 
            array (
                'id' => 24,
                'quote_id' => 6,
                'request_item_id' => NULL,
                'product_feature_id' => 85,
                'qty' => 150,
                'unit_price' => '59322',
                'created_at' => NULL,
                'updated_at' => '2022-09-09 02:48:47',
            ),
            15 => 
            array (
                'id' => 25,
                'quote_id' => 6,
                'request_item_id' => NULL,
                'product_feature_id' => 86,
                'qty' => 500,
                'unit_price' => '59322',
                'created_at' => NULL,
                'updated_at' => '2022-09-09 02:49:02',
            ),
            16 => 
            array (
                'id' => 26,
                'quote_id' => 6,
                'request_item_id' => NULL,
                'product_feature_id' => 87,
                'qty' => 275,
                'unit_price' => '59322',
                'created_at' => NULL,
                'updated_at' => '2022-09-09 02:49:08',
            ),
            17 => 
            array (
                'id' => 27,
                'quote_id' => 6,
                'request_item_id' => NULL,
                'product_feature_id' => 88,
                'qty' => 50,
                'unit_price' => '59322',
                'created_at' => NULL,
                'updated_at' => '2022-09-09 02:49:18',
            ),
            18 => 
            array (
                'id' => 28,
                'quote_id' => 6,
                'request_item_id' => NULL,
                'product_feature_id' => 89,
                'qty' => 20,
                'unit_price' => '59322',
                'created_at' => NULL,
                'updated_at' => '2022-09-09 02:49:30',
            ),
            19 => 
            array (
                'id' => 29,
                'quote_id' => 6,
                'request_item_id' => NULL,
                'product_feature_id' => 90,
                'qty' => 5,
                'unit_price' => '59322',
                'created_at' => NULL,
                'updated_at' => '2022-09-09 02:49:24',
            ),
            20 => 
            array (
                'id' => 30,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 50,
                'qty' => 200,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            21 => 
            array (
                'id' => 31,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 51,
                'qty' => 100,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            22 => 
            array (
                'id' => 32,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 52,
                'qty' => 100,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            23 => 
            array (
                'id' => 33,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 53,
                'qty' => 100,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            24 => 
            array (
                'id' => 34,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 54,
                'qty' => 75,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            25 => 
            array (
                'id' => 35,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 55,
                'qty' => 50,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            26 => 
            array (
                'id' => 36,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 56,
                'qty' => 50,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            27 => 
            array (
                'id' => 37,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 57,
                'qty' => 20,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            28 => 
            array (
                'id' => 38,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 58,
                'qty' => 20,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            29 => 
            array (
                'id' => 39,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 59,
                'qty' => 20,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            30 => 
            array (
                'id' => 40,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 60,
                'qty' => 250,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            31 => 
            array (
                'id' => 41,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 61,
                'qty' => 100,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            32 => 
            array (
                'id' => 42,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 62,
                'qty' => 5,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            33 => 
            array (
                'id' => 43,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 63,
                'qty' => 25,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            34 => 
            array (
                'id' => 44,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 64,
                'qty' => 30,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            35 => 
            array (
                'id' => 45,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 65,
                'qty' => 10,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            36 => 
            array (
                'id' => 46,
                'quote_id' => 7,
                'request_item_id' => NULL,
                'product_feature_id' => 66,
                'qty' => 50,
                'unit_price' => '59292',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            37 => 
            array (
                'id' => 47,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 18,
                'qty' => 61,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            38 => 
            array (
                'id' => 48,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 19,
                'qty' => 61,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:33',
            ),
            39 => 
            array (
                'id' => 49,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 20,
                'qty' => 63,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:36',
            ),
            40 => 
            array (
                'id' => 50,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 21,
                'qty' => 66,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:41',
            ),
            41 => 
            array (
                'id' => 51,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 22,
                'qty' => 69,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:44',
            ),
            42 => 
            array (
                'id' => 52,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 23,
                'qty' => 97,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:47',
            ),
            43 => 
            array (
                'id' => 53,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 24,
                'qty' => 91,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:52',
            ),
            44 => 
            array (
                'id' => 54,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 25,
                'qty' => 104,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:56',
            ),
            45 => 
            array (
                'id' => 55,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 26,
                'qty' => 77,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:57:59',
            ),
            46 => 
            array (
                'id' => 56,
                'quote_id' => 8,
                'request_item_id' => NULL,
                'product_feature_id' => 27,
                'qty' => 79,
                'unit_price' => '23000',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 13:58:03',
            ),
            47 => 
            array (
                'id' => 57,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 28,
                'qty' => 116,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            48 => 
            array (
                'id' => 58,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 29,
                'qty' => 87,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:01:47',
            ),
            49 => 
            array (
                'id' => 59,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 30,
                'qty' => 87,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:02:15',
            ),
            50 => 
            array (
                'id' => 60,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 31,
                'qty' => 232,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:01:27',
            ),
            51 => 
            array (
                'id' => 61,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 32,
                'qty' => 174,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:01:53',
            ),
            52 => 
            array (
                'id' => 62,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 33,
                'qty' => 174,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:02:20',
            ),
            53 => 
            array (
                'id' => 63,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 34,
                'qty' => 232,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:01:35',
            ),
            54 => 
            array (
                'id' => 64,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 35,
                'qty' => 174,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:02:00',
            ),
            55 => 
            array (
                'id' => 65,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 36,
                'qty' => 174,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:02:26',
            ),
            56 => 
            array (
                'id' => 66,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 37,
                'qty' => 116,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:01:40',
            ),
            57 => 
            array (
                'id' => 67,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 38,
                'qty' => 87,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:02:05',
            ),
            58 => 
            array (
                'id' => 68,
                'quote_id' => 9,
                'request_item_id' => NULL,
                'product_feature_id' => 39,
                'qty' => 87,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:02:31',
            ),
            59 => 
            array (
                'id' => 69,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 40,
                'qty' => 77,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            60 => 
            array (
                'id' => 70,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 41,
                'qty' => 77,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            61 => 
            array (
                'id' => 71,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 42,
                'qty' => 154,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            62 => 
            array (
                'id' => 72,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 43,
                'qty' => 154,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            63 => 
            array (
                'id' => 73,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 44,
                'qty' => 231,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            64 => 
            array (
                'id' => 74,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 45,
                'qty' => 231,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            65 => 
            array (
                'id' => 75,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 46,
                'qty' => 309,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            66 => 
            array (
                'id' => 76,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 47,
                'qty' => 309,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            67 => 
            array (
                'id' => 77,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 48,
                'qty' => 154,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            68 => 
            array (
                'id' => 78,
                'quote_id' => 10,
                'request_item_id' => NULL,
                'product_feature_id' => 49,
                'qty' => 154,
                'unit_price' => '0',
                'created_at' => NULL,
                'updated_at' => '2022-09-08 14:05:03',
            ),
        ));
        
        
    }
}