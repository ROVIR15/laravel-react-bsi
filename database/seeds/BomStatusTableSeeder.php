<?php

use Illuminate\Database\Seeder;

class BomStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('bom_status')->delete();
        
        \DB::table('bom_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 2,
                'bom_id' => 2,
                'status_type' => 'Submit',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 02:14:48',
                'updated_at' => '2022-10-05 02:14:48',
            ),
            1 => 
            array (
                'id' => 2,
                'user_id' => 3,
                'bom_id' => 3,
                'status_type' => 'Submit',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 02:14:57',
                'updated_at' => '2022-10-05 02:14:57',
            ),
            2 => 
            array (
                'id' => 3,
                'user_id' => 8,
                'bom_id' => 8,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 02:41:19',
                'updated_at' => '2022-10-05 02:41:19',
            ),
            3 => 
            array (
                'id' => 4,
                'user_id' => 2,
                'bom_id' => 2,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 02:41:30',
                'updated_at' => '2022-10-05 02:41:30',
            ),
            4 => 
            array (
                'id' => 5,
                'user_id' => 3,
                'bom_id' => 3,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 02:41:49',
                'updated_at' => '2022-10-05 02:41:49',
            ),
            5 => 
            array (
                'id' => 6,
                'user_id' => 2,
                'bom_id' => 2,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 04:55:36',
                'updated_at' => '2022-10-05 04:55:36',
            ),
            6 => 
            array (
                'id' => 7,
                'user_id' => 2,
                'bom_id' => 2,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 04:57:13',
                'updated_at' => '2022-10-05 04:57:13',
            ),
            7 => 
            array (
                'id' => 8,
                'user_id' => 3,
                'bom_id' => 3,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 04:58:32',
                'updated_at' => '2022-10-05 04:58:32',
            ),
            8 => 
            array (
                'id' => 9,
                'user_id' => 9,
                'bom_id' => 9,
                'status_type' => 'Submit',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 04:59:11',
                'updated_at' => '2022-10-05 04:59:11',
            ),
            9 => 
            array (
                'id' => 10,
                'user_id' => 11,
                'bom_id' => 11,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 04:59:33',
                'updated_at' => '2022-10-05 04:59:33',
            ),
            10 => 
            array (
                'id' => 11,
                'user_id' => 10,
                'bom_id' => 10,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 05:00:01',
                'updated_at' => '2022-10-05 05:00:01',
            ),
            11 => 
            array (
                'id' => 12,
                'user_id' => 9,
                'bom_id' => 9,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-05 05:00:21',
                'updated_at' => '2022-10-05 05:00:21',
            ),
            12 => 
            array (
                'id' => 13,
                'user_id' => 9,
                'bom_id' => 9,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-06 02:59:33',
                'updated_at' => '2022-10-06 02:59:33',
            ),
            13 => 
            array (
                'id' => 14,
                'user_id' => 2,
                'bom_id' => 2,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-06 03:10:57',
                'updated_at' => '2022-10-06 03:10:57',
            ),
            14 => 
            array (
                'id' => 15,
                'user_id' => 3,
                'bom_id' => 3,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-06 03:11:33',
                'updated_at' => '2022-10-06 03:11:33',
            ),
            15 => 
            array (
                'id' => 16,
                'user_id' => 8,
                'bom_id' => 8,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-06 03:12:38',
                'updated_at' => '2022-10-06 03:12:38',
            ),
            16 => 
            array (
                'id' => 17,
                'user_id' => 14,
                'bom_id' => 14,
                'status_type' => 'Submit',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-14 00:32:57',
                'updated_at' => '2022-10-14 00:32:57',
            ),
            17 => 
            array (
                'id' => 18,
                'user_id' => 13,
                'bom_id' => 13,
                'status_type' => 'Submit',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-14 00:33:18',
                'updated_at' => '2022-10-14 00:33:18',
            ),
            18 => 
            array (
                'id' => 19,
                'user_id' => 12,
                'bom_id' => 12,
                'status_type' => 'Submit',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-14 00:33:25',
                'updated_at' => '2022-10-14 00:33:25',
            ),
            19 => 
            array (
                'id' => 20,
                'user_id' => 4,
                'bom_id' => 4,
                'status_type' => 'Submit',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-14 00:55:48',
                'updated_at' => '2022-10-14 00:55:48',
            ),
            20 => 
            array (
                'id' => 21,
                'user_id' => 14,
                'bom_id' => 14,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-15 10:32:15',
                'updated_at' => '2022-10-15 10:32:15',
            ),
            21 => 
            array (
                'id' => 22,
                'user_id' => 4,
                'bom_id' => 4,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-15 10:33:42',
                'updated_at' => '2022-10-15 10:33:42',
            ),
            22 => 
            array (
                'id' => 23,
                'user_id' => 14,
                'bom_id' => 14,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-17 02:03:48',
                'updated_at' => '2022-10-17 02:03:48',
            ),
            23 => 
            array (
                'id' => 24,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 05:15:04',
                'updated_at' => '2022-10-18 05:15:04',
            ),
            24 => 
            array (
                'id' => 25,
                'user_id' => 15,
                'bom_id' => 15,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 05:15:20',
                'updated_at' => '2022-10-18 05:15:20',
            ),
            25 => 
            array (
                'id' => 26,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 06:15:10',
                'updated_at' => '2022-10-18 06:15:10',
            ),
            26 => 
            array (
                'id' => 27,
                'user_id' => 13,
                'bom_id' => 13,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 06:24:39',
                'updated_at' => '2022-10-18 06:24:39',
            ),
            27 => 
            array (
                'id' => 28,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 06:26:46',
                'updated_at' => '2022-10-18 06:26:46',
            ),
            28 => 
            array (
                'id' => 29,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 06:29:46',
                'updated_at' => '2022-10-18 06:29:46',
            ),
            29 => 
            array (
                'id' => 30,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 06:30:00',
                'updated_at' => '2022-10-18 06:30:00',
            ),
            30 => 
            array (
                'id' => 31,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-18 06:33:37',
                'updated_at' => '2022-10-18 06:33:37',
            ),
            31 => 
            array (
                'id' => 32,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 01:59:38',
                'updated_at' => '2022-10-19 01:59:38',
            ),
            32 => 
            array (
                'id' => 33,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 02:00:59',
                'updated_at' => '2022-10-19 02:00:59',
            ),
            33 => 
            array (
                'id' => 34,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 02:01:52',
                'updated_at' => '2022-10-19 02:01:52',
            ),
            34 => 
            array (
                'id' => 35,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 02:04:57',
                'updated_at' => '2022-10-19 02:04:57',
            ),
            35 => 
            array (
                'id' => 36,
                'user_id' => 16,
                'bom_id' => 16,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 02:49:25',
                'updated_at' => '2022-10-19 02:49:25',
            ),
            36 => 
            array (
                'id' => 37,
                'user_id' => 17,
                'bom_id' => 17,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 05:02:10',
                'updated_at' => '2022-10-19 05:02:10',
            ),
            37 => 
            array (
                'id' => 38,
                'user_id' => 18,
                'bom_id' => 18,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 05:02:30',
                'updated_at' => '2022-10-19 05:02:30',
            ),
            38 => 
            array (
                'id' => 39,
                'user_id' => 20,
                'bom_id' => 20,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 06:39:46',
                'updated_at' => '2022-10-19 06:39:46',
            ),
            39 => 
            array (
                'id' => 40,
                'user_id' => 21,
                'bom_id' => 21,
                'status_type' => 'Reject Review',
                'final_price' => NULL,
                'description' => 'offering price buyer terlalu rendah sedangkan harga CM mencapai 45 ribu',
                'created_at' => '2022-10-19 06:50:20',
                'updated_at' => '2022-10-19 06:50:20',
            ),
            40 => 
            array (
                'id' => 41,
                'user_id' => 12,
                'bom_id' => 12,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 06:58:59',
                'updated_at' => '2022-10-19 06:58:59',
            ),
            41 => 
            array (
                'id' => 42,
                'user_id' => 13,
                'bom_id' => 13,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 06:59:16',
                'updated_at' => '2022-10-19 06:59:16',
            ),
            42 => 
            array (
                'id' => 43,
                'user_id' => 21,
                'bom_id' => 21,
                'status_type' => 'Reject Review',
                'final_price' => NULL,
                'description' => 'harga terlalu rendah',
                'created_at' => '2022-10-19 07:08:50',
                'updated_at' => '2022-10-19 07:08:50',
            ),
            43 => 
            array (
                'id' => 44,
                'user_id' => 21,
                'bom_id' => 21,
                'status_type' => 'Reject Review',
                'final_price' => NULL,
                'description' => 'sss',
                'created_at' => '2022-10-19 07:13:48',
                'updated_at' => '2022-10-19 07:13:48',
            ),
            44 => 
            array (
                'id' => 49,
                'user_id' => 17,
                'bom_id' => 17,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 08:26:54',
                'updated_at' => '2022-10-19 08:26:54',
            ),
            45 => 
            array (
                'id' => 50,
                'user_id' => 20,
                'bom_id' => 20,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 08:28:36',
                'updated_at' => '2022-10-19 08:28:36',
            ),
            46 => 
            array (
                'id' => 51,
                'user_id' => 13,
                'bom_id' => 13,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 08:33:19',
                'updated_at' => '2022-10-19 08:33:19',
            ),
            47 => 
            array (
                'id' => 52,
                'user_id' => 12,
                'bom_id' => 12,
                'status_type' => 'Reject Review',
                'final_price' => NULL,
                'description' => 'a',
                'created_at' => '2022-10-19 08:34:00',
                'updated_at' => '2022-10-19 08:34:00',
            ),
            48 => 
            array (
                'id' => 53,
                'user_id' => 18,
                'bom_id' => 18,
                'status_type' => 'Reject Review',
                'final_price' => NULL,
                'description' => 'a',
                'created_at' => '2022-10-19 08:34:30',
                'updated_at' => '2022-10-19 08:34:30',
            ),
            49 => 
            array (
                'id' => 54,
                'user_id' => 10,
                'bom_id' => 10,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 08:38:22',
                'updated_at' => '2022-10-19 08:38:22',
            ),
            50 => 
            array (
                'id' => 55,
                'user_id' => 11,
                'bom_id' => 11,
                'status_type' => 'Approve',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-19 08:39:27',
                'updated_at' => '2022-10-19 08:39:27',
            ),
            51 => 
            array (
                'id' => 56,
                'user_id' => 20,
                'bom_id' => 20,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-23 03:12:16',
                'updated_at' => '2022-10-23 03:12:16',
            ),
            52 => 
            array (
                'id' => 57,
                'user_id' => 13,
                'bom_id' => 13,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-23 03:12:52',
                'updated_at' => '2022-10-23 03:12:52',
            ),
            53 => 
            array (
                'id' => 58,
                'user_id' => 3,
                'bom_id' => 20,
                'status_type' => 'Reject Approve',
                'final_price' => NULL,
                'description' => 'Hrg terlalu murah',
                'created_at' => '2022-10-24 07:02:04',
                'updated_at' => '2022-10-24 07:02:04',
            ),
            54 => 
            array (
                'id' => 59,
                'user_id' => 3,
                'bom_id' => 13,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-24 07:03:59',
                'updated_at' => '2022-10-24 07:03:59',
            ),
            55 => 
            array (
                'id' => 60,
                'user_id' => 2,
                'bom_id' => 24,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-26 07:16:59',
                'updated_at' => '2022-10-26 07:16:59',
            ),
            56 => 
            array (
                'id' => 61,
                'user_id' => 2,
                'bom_id' => 25,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-26 07:22:36',
                'updated_at' => '2022-10-26 07:22:36',
            ),
            57 => 
            array (
                'id' => 62,
                'user_id' => 2,
                'bom_id' => 24,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-26 07:43:28',
                'updated_at' => '2022-10-26 07:43:28',
            ),
            58 => 
            array (
                'id' => 63,
                'user_id' => 2,
                'bom_id' => 24,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-26 07:43:49',
                'updated_at' => '2022-10-26 07:43:49',
            ),
            59 => 
            array (
                'id' => 64,
                'user_id' => 2,
                'bom_id' => 4,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-29 02:42:17',
                'updated_at' => '2022-10-29 02:42:17',
            ),
            60 => 
            array (
                'id' => 65,
                'user_id' => 2,
                'bom_id' => 4,
                'status_type' => 'Review',
                'final_price' => NULL,
                'description' => NULL,
                'created_at' => '2022-10-29 02:51:40',
                'updated_at' => '2022-10-29 02:51:40',
            ),
            61 => 
            array (
                'id' => 66,
                'user_id' => 2,
                'bom_id' => 25,
                'status_type' => 'Review',
                'final_price' => 27000.0,
                'description' => NULL,
                'created_at' => '2022-11-02 02:44:57',
                'updated_at' => '2022-11-02 02:44:57',
            ),
            62 => 
            array (
                'id' => 67,
                'user_id' => 2,
                'bom_id' => 25,
                'status_type' => 'Review',
                'final_price' => 27000.0,
                'description' => NULL,
                'created_at' => '2022-11-02 02:45:09',
                'updated_at' => '2022-11-02 02:45:09',
            ),
            63 => 
            array (
                'id' => 68,
                'user_id' => 2,
                'bom_id' => 25,
                'status_type' => 'Review',
                'final_price' => 29000.0,
                'description' => NULL,
                'created_at' => '2022-11-02 02:46:29',
                'updated_at' => '2022-11-02 02:46:29',
            ),
            64 => 
            array (
                'id' => 69,
                'user_id' => 2,
                'bom_id' => 25,
                'status_type' => 'Review',
                'final_price' => 29000.0,
                'description' => NULL,
                'created_at' => '2022-11-02 02:47:55',
                'updated_at' => '2022-11-02 02:47:55',
            ),
            65 => 
            array (
                'id' => 70,
                'user_id' => 2,
                'bom_id' => 25,
                'status_type' => 'Review',
                'final_price' => 30000.0,
                'description' => NULL,
                'created_at' => '2022-11-02 02:48:10',
                'updated_at' => '2022-11-02 02:48:10',
            ),
        ));
        
        
    }
}