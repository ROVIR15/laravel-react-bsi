<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BOMOperationWCViewTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::statement("
        CREATE VIEW bom_operation_wc_view
        AS
        select `op`.`bom_id` AS `bom_id`,`op`.`id` AS `operation_id`,`op`.`name` AS `operation_name`,`wc`.`name` AS `work_center_name`,`wc`.`labor_alloc` AS `labor_alloc`,`wc`.`cost_per_hour` AS `cost_per_hour`,`wc`.`work_hours` AS `work_hours`,((`wc`.`labor_alloc` * `wc`.`cost_per_hour`) * `wc`.`work_hours`) AS `calculated_cost`,`wc`.`overhead_cost` AS `overhead_cost` from ((`bsi_db2`.`bom` join `bsi_db2`.`operation` `op` on((`op`.`bom_id` = `bsi_db2`.`bom`.`id`))) join `bsi_db2`.`work_center` `wc` on((`wc`.`id` = `op`.`work_center_id`)))
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement('DROP VIEW IF EXISTS bom_operation_wc_view');
    }
}
