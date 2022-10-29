<?php

use Illuminate\Database\Seeder;

class BomTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('bom')->delete();
        
        \DB::table('bom')->insert(array (
            0 => 
            array (
                'id' => 2,
                'product_id' => 37,
                'product_feature_id' => NULL,
                'name' => 'BIENSI-STYLE3-LINE1',
                'qty' => 10260,
                'company_name' => 'PT BSI',
                'start_date' => '2022-10-01',
                'end_date' => '2022-10-28',
                'created_at' => '2022-09-22 01:28:09',
                'updated_at' => '2022-09-27 01:17:47',
            ),
            1 => 
            array (
                'id' => 3,
                'product_id' => 37,
                'product_feature_id' => NULL,
                'name' => 'BIENSI-STYLE6-LINE2',
                'qty' => 3420,
                'company_name' => 'PT BSI',
                'start_date' => '2022-09-22',
                'end_date' => '2022-09-30',
                'created_at' => '2022-09-22 01:44:58',
                'updated_at' => '2022-09-22 01:44:58',
            ),
        ));
        
        
    }
}