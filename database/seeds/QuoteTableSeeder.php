<?php

use Illuminate\Database\Seeder;

class QuoteTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('quote')->delete();
        
        \DB::table('quote')->insert(array (
            0 => 
            array (
                'id' => 2,
                'po_number' => '22/1J002',
                'party_id' => 5,
                'ship_to' => 7,
                'issue_date' => '2022-08-28',
                'valid_thru' => '2022-09-29',
                'delivery_date' => '2022-09-03',
                'created_at' => '2022-09-04 02:52:26',
                'updated_at' => '2022-09-04 02:52:26',
                'quote_type' => 'PO',
            ),
            1 => 
            array (
                'id' => 3,
                'po_number' => '22/1J003',
                'party_id' => 5,
                'ship_to' => 7,
                'issue_date' => '2022-08-27',
                'valid_thru' => '2022-09-02',
                'delivery_date' => '2022-09-05',
                'created_at' => '2022-09-04 16:32:01',
                'updated_at' => '2022-09-04 16:41:37',
                'quote_type' => 'PO',
            ),
            2 => 
            array (
                'id' => 4,
                'po_number' => '22/1J004',
                'party_id' => 5,
                'ship_to' => 7,
                'issue_date' => '2022-08-31',
                'valid_thru' => '2022-09-03',
                'delivery_date' => '2022-09-06',
                'created_at' => '2022-09-04 16:41:24',
                'updated_at' => '2022-09-04 16:41:24',
                'quote_type' => 'PO',
            ),
            3 => 
            array (
                'id' => 5,
                'po_number' => '22/1J002',
                'party_id' => 2,
                'ship_to' => 3,
                'issue_date' => '2022-09-08',
                'valid_thru' => '2022-09-10',
                'delivery_date' => '2022-09-13',
                'created_at' => '2022-09-06 02:09:16',
                'updated_at' => '2022-09-06 02:09:16',
                'quote_type' => 'SO',
            ),
            4 => 
            array (
                'id' => 6,
                'po_number' => 'PON-1614941',
                'party_id' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-09-09',
                'valid_thru' => '2022-09-10',
                'delivery_date' => '2022-09-17',
                'created_at' => '2022-09-08 12:02:51',
                'updated_at' => '2022-09-08 12:02:51',
                'quote_type' => 'SO',
            ),
            5 => 
            array (
                'id' => 7,
                'po_number' => 'PON-1616606',
                'party_id' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-09-08',
                'valid_thru' => '2022-09-17',
                'delivery_date' => '2022-09-21',
                'created_at' => '2022-09-08 13:52:08',
                'updated_at' => '2022-09-08 13:52:08',
                'quote_type' => 'SO',
            ),
            6 => 
            array (
                'id' => 8,
                'po_number' => 'KKS-EMBA01',
                'party_id' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-08',
                'valid_thru' => '2022-09-10',
                'delivery_date' => '2022-09-30',
                'created_at' => '2022-09-08 13:57:15',
                'updated_at' => '2022-09-08 13:57:15',
                'quote_type' => 'SO',
            ),
            7 => 
            array (
                'id' => 9,
                'po_number' => 'KKS-EMBA02',
                'party_id' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-03',
                'delivery_date' => '2022-09-11',
                'created_at' => '2022-09-08 14:00:08',
                'updated_at' => '2022-09-08 14:00:08',
                'quote_type' => 'SO',
            ),
            8 => 
            array (
                'id' => 10,
                'po_number' => 'KKS-EMBA03',
                'party_id' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-16',
                'delivery_date' => '2022-09-30',
                'created_at' => '2022-09-08 14:04:48',
                'updated_at' => '2022-09-08 14:04:48',
                'quote_type' => 'SO',
            ),
            9 => 
            array (
                'id' => 11,
                'po_number' => '1614941',
                'party_id' => 3,
                'ship_to' => 9,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-09',
                'delivery_date' => '2022-09-29',
                'created_at' => '2022-09-18 23:24:51',
                'updated_at' => '2022-09-18 23:24:51',
                'quote_type' => 'SO',
            ),
            10 => 
            array (
                'id' => 12,
                'po_number' => 'G-A10673',
                'party_id' => 3,
                'ship_to' => 3,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-09',
                'delivery_date' => '2022-09-30',
                'created_at' => '2022-09-19 01:33:00',
                'updated_at' => '2022-09-19 01:33:00',
                'quote_type' => 'SO',
            ),
            11 => 
            array (
                'id' => 13,
                'po_number' => '2C044',
                'party_id' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-09',
                'delivery_date' => '2022-09-30',
                'created_at' => '2022-09-19 02:40:25',
                'updated_at' => '2022-09-19 02:40:25',
                'quote_type' => 'SO',
            ),
            12 => 
            array (
                'id' => 14,
                'po_number' => '2C043',
                'party_id' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-30',
                'delivery_date' => '2022-09-30',
                'created_at' => '2022-09-19 03:04:09',
                'updated_at' => '2022-09-19 03:04:09',
                'quote_type' => 'SO',
            ),
            13 => 
            array (
                'id' => 15,
                'po_number' => '2J002',
                'party_id' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-10',
                'delivery_date' => '2022-09-30',
                'created_at' => '2022-09-19 03:25:34',
                'updated_at' => '2022-09-19 03:25:34',
                'quote_type' => 'SO',
            ),
            14 => 
            array (
                'id' => 16,
                'po_number' => '1C008',
                'party_id' => 2,
                'ship_to' => 2,
                'issue_date' => '2022-09-01',
                'valid_thru' => '2022-09-17',
                'delivery_date' => '2022-09-30',
                'created_at' => '2022-09-20 03:31:11',
                'updated_at' => '2022-09-20 03:31:11',
                'quote_type' => 'SO',
            ),
            15 => 
            array (
                'id' => 17,
                'po_number' => 'FAB-HDE-0922-BIENSI-001',
                'party_id' => 11,
                'ship_to' => 7,
                'issue_date' => '2022-09-20',
                'valid_thru' => '2022-10-10',
                'delivery_date' => '2022-09-28',
                'created_at' => '2022-09-23 08:03:05',
                'updated_at' => '2022-09-23 08:03:05',
                'quote_type' => 'PO',
            ),
            16 => 
            array (
                'id' => 18,
                'po_number' => 'FAB HDE-0922-BIENSIDanjyo - 002',
                'party_id' => 10,
                'ship_to' => 1,
                'issue_date' => '2022-09-22',
                'valid_thru' => '2022-09-30',
                'delivery_date' => '2022-09-22',
                'created_at' => '2022-09-23 08:04:23',
                'updated_at' => '2022-09-23 08:04:23',
                'quote_type' => 'PO',
            ),
        ));
        
        
    }
}