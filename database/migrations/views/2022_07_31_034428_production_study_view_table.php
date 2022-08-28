<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductionStudyViewTable extends Migration
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
        CREATE VIEW production_study_view
        AS
        select `bsi_db`.`production_study`.`id` AS `id`,`bsi_db`.`work_center`.`id` AS `work_center_id`,`product_information_view`.`id` AS `product_id`,`bsi_db`.`work_center`.`name` AS `work_center_name`,`product_information_view`.`name` AS `product_name`,count(`bsi_db`.`process_study`.`process_id`) AS `process_numbers`,count(`bsi_db`.`process_study`.`party_id`) AS `labor_numbers` from (((`bsi_db`.`production_study` join `bsi_db`.`work_center` on((`bsi_db`.`work_center`.`id` = `bsi_db`.`production_study`.`work_center_id`))) join `bsi_db`.`product_information_view` on((`product_information_view`.`id` = `bsi_db`.`production_study`.`id`))) join `bsi_db`.`process_study` on((`bsi_db`.`production_study`.`id` = `bsi_db`.`process_study`.`production_study_id`))) group by `bsi_db`.`production_study`.`id`        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement('DROP VIEW IF EXISTS production_study_view');
    }
}
