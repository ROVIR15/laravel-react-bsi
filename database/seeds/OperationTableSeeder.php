<?php

use Illuminate\Database\Seeder;

class OperationTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('operation')->delete();
        
        \DB::table('operation')->insert(array (
            0 => 
            array (
                'id' => 3,
                'name' => 'BIENSI-STYLE6-LINE',
                'seq' => 0,
                'work_center_id' => 3,
                'bom_id' => 3,
                'created_at' => '2022-09-23 04:21:26',
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 5,
                'name' => 'BIENSI-STYLE3-LINE',
                'seq' => 0,
                'work_center_id' => 4,
                'bom_id' => 2,
                'created_at' => '2022-09-27 01:13:46',
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 8,
                'name' => 'KKS Emba-DAREN',
                'seq' => 0,
                'work_center_id' => 9,
                'bom_id' => 9,
                'created_at' => '2022-10-05 03:24:01',
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 9,
                'name' => 'KKS Emba-EDDIE',
                'seq' => 0,
                'work_center_id' => 8,
                'bom_id' => 10,
                'created_at' => '2022-10-05 03:24:39',
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 10,
                'name' => 'KKS Emba-DEVANO',
                'seq' => 0,
                'work_center_id' => 7,
                'bom_id' => 11,
                'created_at' => '2022-10-05 03:25:31',
                'updated_at' => NULL,
            ),
            5 => 
            array (
                'id' => 11,
                'name' => 'Sewing-Line-Menshirt',
                'seq' => 0,
                'work_center_id' => 10,
                'bom_id' => 12,
                'created_at' => '2022-10-13 03:14:27',
                'updated_at' => NULL,
            ),
            6 => 
            array (
                'id' => 12,
                'name' => 'Sewing-Line-Menshirt',
                'seq' => 0,
                'work_center_id' => 10,
                'bom_id' => 13,
                'created_at' => '2022-10-13 03:17:14',
                'updated_at' => NULL,
            ),
            7 => 
            array (
                'id' => 13,
                'name' => 'SEWING_KKS_EMBA_SPIRNGBOXANDTOMSKY',
                'seq' => 0,
                'work_center_id' => 11,
                'bom_id' => 14,
                'created_at' => '2022-10-14 00:25:08',
                'updated_at' => NULL,
            ),
            8 => 
            array (
                'id' => 14,
                'name' => 'BIENSI_TOMTAYLOR_NOV',
                'seq' => 0,
                'work_center_id' => 19,
                'bom_id' => 4,
                'created_at' => '2022-10-14 05:59:58',
                'updated_at' => NULL,
            ),
            9 => 
            array (
                'id' => 16,
                'name' => 'II_AOI T785, T797, T796, S169, T819',
                'seq' => 0,
                'work_center_id' => 21,
                'bom_id' => 16,
                'created_at' => '2022-10-18 05:12:43',
                'updated_at' => NULL,
            ),
            10 => 
            array (
                'id' => 17,
                'name' => 'I_ISG_Celana_Okt_2022',
                'seq' => 0,
                'work_center_id' => 22,
                'bom_id' => 17,
                'created_at' => '2022-10-18 08:50:01',
                'updated_at' => NULL,
            ),
            11 => 
            array (
                'id' => 18,
                'name' => 'II_ISG_Celana_Okt_2022',
                'seq' => 0,
                'work_center_id' => 23,
                'bom_id' => 18,
                'created_at' => '2022-10-19 04:55:07',
                'updated_at' => NULL,
            ),
            12 => 
            array (
                'id' => 20,
                'name' => 'Finley, Eagle, dan Gates Pants',
                'seq' => 0,
                'work_center_id' => 16,
                'bom_id' => 20,
                'created_at' => '2022-10-19 06:34:04',
                'updated_at' => NULL,
            ),
            13 => 
            array (
                'id' => 21,
                'name' => 'Jacket Winslow dan Pegasus',
                'seq' => 0,
                'work_center_id' => 13,
                'bom_id' => 21,
                'created_at' => '2022-10-19 06:48:43',
                'updated_at' => NULL,
            ),
            14 => 
            array (
                'id' => 23,
                'name' => 'ISG-JOEYRIDAPANTS-SEWING',
                'seq' => 0,
                'work_center_id' => 25,
                'bom_id' => 23,
                'created_at' => '2022-10-26 07:15:21',
                'updated_at' => NULL,
            ),
            15 => 
            array (
                'id' => 25,
                'name' => 'ISG-JOEYRIDAPANTS-SEWING-500',
                'seq' => 0,
                'work_center_id' => 27,
                'bom_id' => 25,
                'created_at' => '2022-10-26 07:21:00',
                'updated_at' => NULL,
            ),
            16 => 
            array (
                'id' => 26,
                'name' => 'I_ISG_Celana_Okt_2022',
                'seq' => 0,
                'work_center_id' => 22,
                'bom_id' => 8,
                'created_at' => '2022-11-14 05:36:39',
                'updated_at' => NULL,
            ),
            17 => 
            array (
                'id' => 28,
                'name' => 'EMBA-DEON.2',
                'seq' => 2,
                'work_center_id' => 32,
                'bom_id' => 32,
                'created_at' => '2022-12-13 04:06:09',
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}