<?php

use Illuminate\Database\Seeder;

class WorkCenterTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('work_center')->delete();
        
        \DB::table('work_center')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Sewing Line',
                'company_name' => 'PT. BSI',
                'oee_target' => 90,
                'prod_capacity' => 1000,
                'work_hours' => 5,
                'layout_produksi' => 0,
                'cost_per_hour' => 8500000,
                'labor_alloc' => 30,
                'description' => 'Sewing',
                'overhead_cost' => 0,
                'created_at' => '2022-09-03 16:51:52',
                'updated_at' => '2022-09-03 16:51:52',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Sewing Line 1',
                'company_name' => 'PT BSI Indonesia',
                'oee_target' => 1,
                'prod_capacity' => 30,
                'work_hours' => 10,
                'layout_produksi' => 0,
                'cost_per_hour' => 8500000,
                'labor_alloc' => 30,
                'description' => 'haahah',
                'overhead_cost' => 30000,
                'created_at' => '2022-09-08 03:26:31',
                'updated_at' => '2022-09-08 03:26:31',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'BIENSI-STYLE6-LINE',
                'company_name' => 'PT. Buana Sandang Indonesia',
                'oee_target' => 1,
                'prod_capacity' => 400,
                'work_hours' => 8,
                'layout_produksi' => 0,
                'cost_per_hour' => 10000000,
                'labor_alloc' => 40,
                'description' => 'BIENSI',
                'overhead_cost' => 0,
                'created_at' => '2022-09-21 11:45:58',
                'updated_at' => '2022-09-21 11:45:58',
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'BIENSI-STYLE3-LINE',
                'company_name' => 'PT Buana Sandang Indonesia',
                'oee_target' => 1,
                'prod_capacity' => 400,
                'work_hours' => 28,
                'layout_produksi' => 3,
                'cost_per_hour' => 10000000,
                'labor_alloc' => 40,
                'description' => 'Sewing',
                'overhead_cost' => 0,
                'created_at' => '2022-09-27 01:13:10',
                'updated_at' => '2022-09-27 01:13:10',
            ),
        ));
        
        
    }
}