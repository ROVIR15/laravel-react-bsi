<?php

use Illuminate\Database\Seeder;

class SalesOrderTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('sales_order')->delete();
        
        \DB::table('sales_order')->insert(array (
            0 => 
            array (
                'id' => 1,
                'po_number' => 'KKS-EMBA00-JAVIER',
                'order_id' => 5,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-08',
                'delivery_date' => '2022-09-13',
                'valid_thru' => '2022-09-10',
                'created_at' => '2022-09-06 02:53:49',
                'updated_at' => '2022-09-06 02:53:49',
            ),
            1 => 
            array (
                'id' => 2,
                'po_number' => 'KKS-EMBA01-JASPER',
                'order_id' => 7,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-08',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-10',
                'created_at' => '2022-09-13 02:37:46',
                'updated_at' => '2022-09-13 02:37:46',
            ),
            2 => 
            array (
                'id' => 3,
                'po_number' => 'KKS-EMBA02-NUXVER',
                'order_id' => 8,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-11',
                'valid_thru' => '2022-09-03',
                'created_at' => '2022-09-13 02:38:28',
                'updated_at' => '2022-09-13 02:38:28',
            ),
            3 => 
            array (
                'id' => 6,
                'po_number' => 'KKS-EMBA03-BS08',
                'order_id' => 11,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-16',
                'created_at' => '2022-09-13 02:40:16',
                'updated_at' => '2022-09-13 02:40:16',
            ),
            4 => 
            array (
                'id' => 7,
                'po_number' => 'BBI-AOI-J918',
                'order_id' => 12,
                'sold_to' => 3,
                'ship_to' => 9,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-29',
                'valid_thru' => '2022-09-09',
                'created_at' => '2022-09-18 23:25:58',
                'updated_at' => '2022-09-18 23:25:58',
            ),
            5 => 
            array (
                'id' => 8,
                'po_number' => 'BBI-7519',
                'order_id' => 13,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-09',
                'created_at' => '2022-09-19 01:33:34',
                'updated_at' => '2022-09-19 01:33:34',
            ),
            6 => 
            array (
                'id' => 9,
                'po_number' => 'KKS-EMBA04-BASSMAN',
                'order_id' => 14,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-09',
                'created_at' => '2022-09-19 02:50:15',
                'updated_at' => '2022-09-19 02:50:15',
            ),
            7 => 
            array (
                'id' => 10,
                'po_number' => 'KKS-EMBA05-UIVER',
                'order_id' => 15,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-30',
                'created_at' => '2022-09-19 03:04:50',
                'updated_at' => '2022-09-19 03:04:50',
            ),
            8 => 
            array (
                'id' => 11,
                'po_number' => 'KKS-EMBA06-STAR',
                'order_id' => 16,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-10',
                'created_at' => '2022-09-19 03:25:54',
                'updated_at' => '2022-09-19 03:25:54',
            ),
            9 => 
            array (
                'id' => 12,
                'po_number' => 'KKS-EMBA07-BS07',
                'order_id' => 17,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'delivery_date' => '2022-09-30',
                'valid_thru' => '2022-09-17',
                'created_at' => '2022-09-20 03:31:42',
                'updated_at' => '2022-09-20 03:31:42',
            ),
            10 => 
            array (
                'id' => 13,
                'po_number' => 'KKS-DEVANO-10',
                'order_id' => 23,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-13',
                'valid_thru' => '2022-10-08',
                'created_at' => '2022-10-05 02:03:22',
                'updated_at' => '2022-10-05 02:03:22',
            ),
            11 => 
            array (
                'id' => 14,
                'po_number' => 'KKS-DAREN',
                'order_id' => 24,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-21',
                'valid_thru' => '2022-10-07',
                'created_at' => '2022-10-05 02:53:54',
                'updated_at' => '2022-10-05 02:53:54',
            ),
            12 => 
            array (
                'id' => 15,
                'po_number' => 'KKS-EDDIE',
                'order_id' => 25,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-12',
                'valid_thru' => '2022-10-08',
                'created_at' => '2022-10-05 03:00:51',
                'updated_at' => '2022-10-05 03:00:51',
            ),
            13 => 
            array (
                'id' => 16,
                'po_number' => 'KKS-EMBA-10/22-ANGKASA',
                'order_id' => 26,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-30',
                'valid_thru' => '2022-10-15',
                'created_at' => '2022-10-06 06:57:50',
                'updated_at' => '2022-10-06 06:57:50',
            ),
            14 => 
            array (
                'id' => 17,
                'po_number' => 'Cressida-01',
                'order_id' => 27,
                'sold_to' => 1,
                'ship_to' => 13,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-31',
                'valid_thru' => '2022-10-10',
                'created_at' => '2022-10-07 02:23:27',
                'updated_at' => '2022-10-07 02:23:27',
            ),
            15 => 
            array (
                'id' => 18,
                'po_number' => 'AOI_J735_OKT_2022',
                'order_id' => 28,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-31',
                'valid_thru' => '2022-10-14',
                'created_at' => '2022-10-14 01:04:07',
                'updated_at' => '2022-10-14 01:04:07',
            ),
            16 => 
            array (
                'id' => 20,
                'po_number' => 'AOI_J736_OKT_2022',
                'order_id' => 30,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-27',
                'valid_thru' => '2022-10-14',
                'created_at' => '2022-10-14 01:05:11',
                'updated_at' => '2022-10-14 01:05:11',
            ),
            17 => 
            array (
                'id' => 21,
                'po_number' => 'KKS-EMBA-PRODIGY-JULY',
                'order_id' => 31,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-10-01',
                'delivery_date' => '2022-10-31',
                'valid_thru' => '2022-10-05',
                'created_at' => '2022-10-14 01:10:29',
                'updated_at' => '2022-10-14 01:10:29',
            ),
            18 => 
            array (
                'id' => 22,
                'po_number' => 'KKS-EMBA-SPRINGBOX',
                'order_id' => 33,
                'sold_to' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-10-21',
                'delivery_date' => '2022-10-31',
                'valid_thru' => '2022-10-25',
                'created_at' => '2022-10-21 09:11:29',
                'updated_at' => '2022-10-21 09:11:29',
            ),
            19 => 
            array (
                'id' => 23,
                'po_number' => 'ISG-TOMMY BAHAMA-1-OCT-22',
                'order_id' => 34,
                'sold_to' => 16,
                'ship_to' => 16,
                'issue_date' => '2022-10-24',
                'delivery_date' => '2022-10-28',
                'valid_thru' => '2022-10-25',
                'created_at' => '2022-10-24 02:33:47',
                'updated_at' => '2022-10-24 02:33:47',
            ),
            20 => 
            array (
                'id' => 24,
            'po_number' => '003CRS/HMKBS.HB026X-MM (CS 25)',
                'order_id' => 35,
                'sold_to' => 13,
                'ship_to' => 13,
                'issue_date' => '2022-10-27',
                'delivery_date' => '2022-11-04',
                'valid_thru' => '2022-11-03',
                'created_at' => '2022-10-27 04:40:44',
                'updated_at' => '2022-10-27 04:40:44',
            ),
            21 => 
            array (
                'id' => 26,
            'po_number' => '004CRS/HMKAL.HB030X-MM (CR 21)',
                'order_id' => 37,
                'sold_to' => 13,
                'ship_to' => 13,
                'issue_date' => '2022-10-27',
                'delivery_date' => '2022-11-04',
                'valid_thru' => '2022-11-03',
                'created_at' => '2022-10-27 04:43:05',
                'updated_at' => '2022-10-27 04:43:05',
            ),
            22 => 
            array (
                'id' => 27,
            'po_number' => '004CRS/HMKAL.HB030X-MM (CR 21)',
                'order_id' => 38,
                'sold_to' => 13,
                'ship_to' => 13,
                'issue_date' => '2022-10-27',
                'delivery_date' => '2022-11-04',
                'valid_thru' => '2022-11-03',
                'created_at' => '2022-10-27 04:43:15',
                'updated_at' => '2022-10-27 04:43:15',
            ),
            23 => 
            array (
                'id' => 28,
            'po_number' => '005CRS/HMKJS.KB016X-MM (KB 21)',
                'order_id' => 39,
                'sold_to' => 13,
                'ship_to' => 13,
                'issue_date' => '2022-10-27',
                'delivery_date' => '2022-11-04',
                'valid_thru' => '2022-11-03',
                'created_at' => '2022-10-27 04:44:04',
                'updated_at' => '2022-10-27 04:44:04',
            ),
            24 => 
            array (
                'id' => 29,
            'po_number' => '006CRS/HMKBL.HB066X-MM (CS 74)',
                'order_id' => 40,
                'sold_to' => 13,
                'ship_to' => 13,
                'issue_date' => '2022-10-28',
                'delivery_date' => '2022-11-07',
                'valid_thru' => '2022-10-31',
                'created_at' => '2022-10-28 07:59:07',
                'updated_at' => '2022-10-28 07:59:07',
            ),
            25 => 
            array (
                'id' => 30,
                'po_number' => '003-AOI-T797-PON 1624368',
                'order_id' => 41,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-10-14',
                'delivery_date' => '2022-11-28',
                'valid_thru' => '2023-01-12',
                'created_at' => '2022-10-28 08:42:13',
                'updated_at' => '2022-10-28 08:42:13',
            ),
            26 => 
            array (
                'id' => 31,
                'po_number' => '004-AOI-T785-PON 1624320',
                'order_id' => 42,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-10-14',
                'delivery_date' => '2022-11-28',
                'valid_thru' => '2023-01-12',
                'created_at' => '2022-10-29 02:47:27',
                'updated_at' => '2022-10-29 02:47:27',
            ),
            27 => 
            array (
                'id' => 32,
                'po_number' => '005-AOI-T796-PON 1624367',
                'order_id' => 43,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-10-14',
                'delivery_date' => '2022-11-28',
                'valid_thru' => '2023-01-12',
                'created_at' => '2022-10-29 02:48:21',
                'updated_at' => '2022-10-29 02:48:21',
            ),
            28 => 
            array (
                'id' => 33,
                'po_number' => '006-AOI-T819-PON 1624369',
                'order_id' => 44,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-10-14',
                'delivery_date' => '2022-11-28',
                'valid_thru' => '2023-01-29',
                'created_at' => '2022-10-29 02:48:34',
                'updated_at' => '2022-10-29 02:48:34',
            ),
            29 => 
            array (
                'id' => 34,
                'po_number' => '007-AOI-S169-PON 1624377',
                'order_id' => 45,
                'sold_to' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-10-14',
                'delivery_date' => '2022-11-28',
                'valid_thru' => '2023-01-12',
                'created_at' => '2022-10-29 02:48:54',
                'updated_at' => '2022-10-29 02:48:54',
            ),
            30 => 
            array (
                'id' => 35,
            'po_number' => '002CRS/HMKBS.HB073X-MM (BS 6/CS 6)',
                'order_id' => 46,
                'sold_to' => 13,
                'ship_to' => 13,
                'issue_date' => '2022-10-27',
                'delivery_date' => '2022-11-04',
                'valid_thru' => '2022-11-03',
                'created_at' => '2022-10-29 06:10:20',
                'updated_at' => '2022-10-29 06:10:20',
            ),
        ));
        
        
    }
}