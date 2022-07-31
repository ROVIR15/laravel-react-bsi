<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudyProcessObservationResultTable extends Migration
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
        CREATE VIEW study_process_observation_result_view
        AS
        select `spor`.`process_study_id` AS `id`,`bsi_db`.`production_study`.`id` AS `production_study_id`,`lv`.`id` AS `labor_id`,`spor`.`observation_result_id` AS `observation_result_id`,`bsi_db`.`process`.`name` AS `process_name`,`lv`.`name` AS `labor_name`,cast(sum(if((`obr`.`name` = 'test_1'),`obr`.`result`,0)) as decimal(7,2)) AS `test_1`,cast(sum(if((`obr`.`name` = 'test_2'),`obr`.`result`,0)) as decimal(7,2)) AS `test_2`,cast(sum(if((`obr`.`name` = 'test_3'),`obr`.`result`,0)) as decimal(7,2)) AS `test_3` from (((((`bsi_db`.`study_process_observation_result` `spor` join `bsi_db`.`process_study` on((`bsi_db`.`process_study`.`id` = `spor`.`process_study_id`))) join `bsi_db`.`observation_result` `obr` on((`obr`.`id` = `spor`.`observation_result_id`))) join `bsi_db`.`process` on((`bsi_db`.`process`.`id` = `bsi_db`.`process_study`.`process_id`))) join `bsi_db`.`production_study` on((`bsi_db`.`production_study`.`id` = `bsi_db`.`process_study`.`production_study_id`))) join `bsi_db`.`labor_view` `lv` on((`lv`.`id` = `bsi_db`.`process_study`.`party_id`))) group by `spor`.`process_study_id`
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
        DB::statement('DROP VIEW IF EXISTS study_process_observation_result_view');
    }
}
