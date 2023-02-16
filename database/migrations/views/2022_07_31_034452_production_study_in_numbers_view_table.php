<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductionStudyInNumbersViewTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW production_study_in_numbers_view
        AS
        select `bsi_db2`.`production_study`.`id` AS `id`,`bsi_db2`.`work_center`.`id` AS `work_center_id`,`product_information_view`.`id` AS `product_id`,`bsi_db2`.`work_center`.`name` AS `work_center_name`,`product_information_view`.`name` AS `product_name` from ((`bsi_db2`.`production_study` join `bsi_db2`.`work_center` on((`bsi_db2`.`work_center`.`id` = `bsi_db2`.`production_study`.`work_center_id`))) join `bsi_db2`.`product_information_view` on((`product_information_view`.`id` = `bsi_db2`.`production_study`.`id`)))
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS production_study_in_numbers_view');
    }
}
