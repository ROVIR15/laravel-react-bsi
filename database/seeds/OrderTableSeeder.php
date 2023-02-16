<?php

use Illuminate\Database\Seeder;

class OrderTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('order')->delete();
        
        \DB::table('order')->insert(array (
            0 => 
            array (
                'id' => 2,
                'sales_order_id' => NULL,
                'purchase_order_id' => 2,
                'quote_id' => 2,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-04 16:42:10',
                'updated_at' => '2022-09-04 16:42:10',
            ),
            1 => 
            array (
                'id' => 3,
                'sales_order_id' => NULL,
                'purchase_order_id' => 3,
                'quote_id' => 3,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-04 16:42:35',
                'updated_at' => '2022-09-04 16:42:35',
            ),
            2 => 
            array (
                'id' => 4,
                'sales_order_id' => NULL,
                'purchase_order_id' => 4,
                'quote_id' => 4,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-04 16:44:53',
                'updated_at' => '2022-09-04 16:44:53',
            ),
            3 => 
            array (
                'id' => 5,
                'sales_order_id' => 1,
                'purchase_order_id' => NULL,
                'quote_id' => 5,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-06 02:53:49',
                'updated_at' => '2022-09-06 02:53:49',
            ),
            4 => 
            array (
                'id' => 6,
                'sales_order_id' => NULL,
                'purchase_order_id' => 5,
                'quote_id' => 2,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-13 01:34:18',
                'updated_at' => '2022-09-13 01:34:18',
            ),
            5 => 
            array (
                'id' => 7,
                'sales_order_id' => 2,
                'purchase_order_id' => NULL,
                'quote_id' => 8,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-13 02:37:46',
                'updated_at' => '2022-09-13 02:37:46',
            ),
            6 => 
            array (
                'id' => 8,
                'sales_order_id' => 3,
                'purchase_order_id' => NULL,
                'quote_id' => 9,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-13 02:38:28',
                'updated_at' => '2022-09-13 02:38:28',
            ),
            7 => 
            array (
                'id' => 11,
                'sales_order_id' => 6,
                'purchase_order_id' => NULL,
                'quote_id' => 10,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-13 02:40:16',
                'updated_at' => '2022-09-13 02:40:16',
            ),
            8 => 
            array (
                'id' => 12,
                'sales_order_id' => 7,
                'purchase_order_id' => NULL,
                'quote_id' => 11,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-18 23:25:58',
                'updated_at' => '2022-09-18 23:25:58',
            ),
            9 => 
            array (
                'id' => 13,
                'sales_order_id' => 8,
                'purchase_order_id' => NULL,
                'quote_id' => 12,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-19 01:33:34',
                'updated_at' => '2022-09-19 01:33:34',
            ),
            10 => 
            array (
                'id' => 14,
                'sales_order_id' => 9,
                'purchase_order_id' => NULL,
                'quote_id' => 13,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-19 02:50:15',
                'updated_at' => '2022-09-19 02:50:15',
            ),
            11 => 
            array (
                'id' => 15,
                'sales_order_id' => 10,
                'purchase_order_id' => NULL,
                'quote_id' => 14,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-19 03:04:50',
                'updated_at' => '2022-09-19 03:04:50',
            ),
            12 => 
            array (
                'id' => 17,
                'sales_order_id' => 12,
                'purchase_order_id' => NULL,
                'quote_id' => 16,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-20 03:31:42',
                'updated_at' => '2022-09-20 03:31:42',
            ),
            13 => 
            array (
                'id' => 18,
                'sales_order_id' => NULL,
                'purchase_order_id' => NULL,
                'quote_id' => NULL,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 19,
                'sales_order_id' => NULL,
                'purchase_order_id' => NULL,
                'quote_id' => NULL,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 20,
                'sales_order_id' => NULL,
                'purchase_order_id' => 6,
                'quote_id' => 18,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-09-23 08:05:23',
                'updated_at' => '2022-09-23 08:05:23',
            ),
            16 => 
            array (
                'id' => 21,
                'sales_order_id' => NULL,
                'purchase_order_id' => 7,
                'quote_id' => 17,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-03 03:39:03',
                'updated_at' => '2022-10-03 03:39:03',
            ),
            17 => 
            array (
                'id' => 22,
                'sales_order_id' => NULL,
                'purchase_order_id' => 8,
                'quote_id' => 20,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-04 03:31:28',
                'updated_at' => '2022-10-04 03:31:28',
            ),
            18 => 
            array (
                'id' => 23,
                'sales_order_id' => 13,
                'purchase_order_id' => NULL,
                'quote_id' => 22,
                'tax' => 11.0,
                'description' => '1. wow',
                'created_at' => '2022-10-05 02:03:22',
                'updated_at' => '2022-12-04 10:43:32',
            ),
            19 => 
            array (
                'id' => 24,
                'sales_order_id' => 14,
                'purchase_order_id' => NULL,
                'quote_id' => 23,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 02:53:54',
                'updated_at' => '2022-10-05 02:53:54',
            ),
            20 => 
            array (
                'id' => 25,
                'sales_order_id' => 15,
                'purchase_order_id' => NULL,
                'quote_id' => 24,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 03:00:51',
                'updated_at' => '2022-10-05 03:00:51',
            ),
            21 => 
            array (
                'id' => 26,
                'sales_order_id' => 16,
                'purchase_order_id' => NULL,
                'quote_id' => 26,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-06 06:57:50',
                'updated_at' => '2022-10-06 06:57:50',
            ),
            22 => 
            array (
                'id' => 27,
                'sales_order_id' => 17,
                'purchase_order_id' => NULL,
                'quote_id' => 28,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-07 02:23:27',
                'updated_at' => '2022-10-07 02:23:27',
            ),
            23 => 
            array (
                'id' => 28,
                'sales_order_id' => 18,
                'purchase_order_id' => NULL,
                'quote_id' => 31,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-14 01:04:07',
                'updated_at' => '2022-10-14 01:04:07',
            ),
            24 => 
            array (
                'id' => 30,
                'sales_order_id' => 20,
                'purchase_order_id' => NULL,
                'quote_id' => 32,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-14 01:05:11',
                'updated_at' => '2022-10-14 01:05:11',
            ),
            25 => 
            array (
                'id' => 31,
                'sales_order_id' => 21,
                'purchase_order_id' => NULL,
                'quote_id' => 33,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-14 01:10:29',
                'updated_at' => '2022-10-14 01:10:29',
            ),
            26 => 
            array (
                'id' => 32,
                'sales_order_id' => NULL,
                'purchase_order_id' => 9,
                'quote_id' => 34,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-17 05:49:19',
                'updated_at' => '2022-10-17 05:49:19',
            ),
            27 => 
            array (
                'id' => 33,
                'sales_order_id' => 22,
                'purchase_order_id' => NULL,
                'quote_id' => 37,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-21 09:11:29',
                'updated_at' => '2022-10-21 09:11:29',
            ),
            28 => 
            array (
                'id' => 34,
                'sales_order_id' => 23,
                'purchase_order_id' => NULL,
                'quote_id' => 38,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-24 02:33:47',
                'updated_at' => '2022-10-24 02:33:47',
            ),
            29 => 
            array (
                'id' => 35,
                'sales_order_id' => 24,
                'purchase_order_id' => NULL,
                'quote_id' => 41,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-27 04:40:44',
                'updated_at' => '2022-10-27 04:40:44',
            ),
            30 => 
            array (
                'id' => 37,
                'sales_order_id' => 26,
                'purchase_order_id' => NULL,
                'quote_id' => 42,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-27 04:43:05',
                'updated_at' => '2022-10-27 04:43:05',
            ),
            31 => 
            array (
                'id' => 38,
                'sales_order_id' => 27,
                'purchase_order_id' => NULL,
                'quote_id' => 42,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-27 04:43:15',
                'updated_at' => '2022-10-27 04:43:15',
            ),
            32 => 
            array (
                'id' => 39,
                'sales_order_id' => 28,
                'purchase_order_id' => NULL,
                'quote_id' => 44,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-27 04:44:04',
                'updated_at' => '2022-10-27 04:44:04',
            ),
            33 => 
            array (
                'id' => 40,
                'sales_order_id' => 29,
                'purchase_order_id' => NULL,
                'quote_id' => 46,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-28 07:59:07',
                'updated_at' => '2022-10-28 07:59:07',
            ),
            34 => 
            array (
                'id' => 41,
                'sales_order_id' => 30,
                'purchase_order_id' => NULL,
                'quote_id' => 47,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-28 08:42:13',
                'updated_at' => '2022-10-28 08:42:13',
            ),
            35 => 
            array (
                'id' => 42,
                'sales_order_id' => 31,
                'purchase_order_id' => NULL,
                'quote_id' => 49,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-29 02:47:27',
                'updated_at' => '2022-10-29 02:47:27',
            ),
            36 => 
            array (
                'id' => 43,
                'sales_order_id' => 32,
                'purchase_order_id' => NULL,
                'quote_id' => 50,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-29 02:48:21',
                'updated_at' => '2022-10-29 02:48:21',
            ),
            37 => 
            array (
                'id' => 44,
                'sales_order_id' => 33,
                'purchase_order_id' => NULL,
                'quote_id' => 51,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-29 02:48:34',
                'updated_at' => '2022-10-29 02:48:34',
            ),
            38 => 
            array (
                'id' => 45,
                'sales_order_id' => 34,
                'purchase_order_id' => NULL,
                'quote_id' => 52,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-29 02:48:54',
                'updated_at' => '2022-10-29 02:48:54',
            ),
            39 => 
            array (
                'id' => 46,
                'sales_order_id' => 35,
                'purchase_order_id' => NULL,
                'quote_id' => 53,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-29 06:10:20',
                'updated_at' => '2022-10-29 06:10:20',
            ),
            40 => 
            array (
                'id' => 47,
                'sales_order_id' => NULL,
                'purchase_order_id' => 10,
                'quote_id' => 29,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-12-03 02:37:02',
                'updated_at' => '2022-12-03 02:37:02',
            ),
            41 => 
            array (
                'id' => 50,
                'sales_order_id' => NULL,
                'purchase_order_id' => 13,
                'quote_id' => 35,
                'tax' => 11.0,
                'description' => '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2. Donec sit amet nibh ac felis congue sagittis.
3. Mauris ut magna in urna tincidunt congue sed quis justo.
4. Quisque aliquet tortor eget erat semper, facilisis tincidunt est mattis.',
                'created_at' => '2022-12-03 03:21:07',
                'updated_at' => '2022-12-04 10:22:54',
            ),
            42 => 
            array (
                'id' => 51,
                'sales_order_id' => NULL,
                'purchase_order_id' => 14,
                'quote_id' => 17,
                'tax' => NULL,
                'description' => '1. another life',
                'created_at' => '2022-12-03 03:23:49',
                'updated_at' => '2022-12-04 10:05:15',
            ),
            43 => 
            array (
                'id' => 52,
                'sales_order_id' => NULL,
                'purchase_order_id' => 15,
                'quote_id' => 18,
                'tax' => 11.0,
                'description' => 'www',
                'created_at' => '2022-12-04 12:01:45',
                'updated_at' => '2022-12-04 12:01:45',
            ),
            44 => 
            array (
                'id' => 53,
                'sales_order_id' => NULL,
                'purchase_order_id' => 16,
                'quote_id' => 18,
                'tax' => 11.0,
                'description' => 'done',
                'created_at' => '2022-12-04 12:03:27',
                'updated_at' => '2022-12-04 12:03:27',
            ),
            45 => 
            array (
                'id' => 54,
                'sales_order_id' => NULL,
                'purchase_order_id' => 17,
                'quote_id' => 18,
                'tax' => 11.0,
                'description' => 'skfdsf',
                'created_at' => '2022-12-04 12:06:16',
                'updated_at' => '2022-12-04 12:06:16',
            ),
            46 => 
            array (
                'id' => 55,
                'sales_order_id' => 36,
                'purchase_order_id' => NULL,
                'quote_id' => 10,
                'tax' => NULL,
                'description' => NULL,
                'created_at' => '2022-12-04 12:07:15',
                'updated_at' => '2022-12-04 12:07:15',
            ),
            47 => 
            array (
                'id' => 56,
                'sales_order_id' => NULL,
                'purchase_order_id' => 18,
                'quote_id' => 54,
                'tax' => 11.0,
                'description' => 'None',
                'created_at' => '2023-01-02 07:37:07',
                'updated_at' => '2023-01-02 07:37:07',
            ),
        ));
        
        
    }
}