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
        ));
        
        
    }
}