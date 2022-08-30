<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProcessStudyViewTable extends Migration
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
        CREATE VIEW process_study_view
        AS
        select `bsi_db2`.`process_study`.`id` AS `id`,`bsi_db2`.`process_study`.`production_study_id` AS `production_study_id`,`bsi_db2`.`process`.`id` AS `process_id`,`bsi_db2`.`process_study`.`party_id` AS `labor_id`,`bsi_db2`.`process`.`name` AS `process_name`,`lv`.`name` AS `labor_name`,`bsi_db2`.`process_study`.`seq_1` AS `seq_1`,`bsi_db2`.`process_study`.`seq_2` AS `seq_2`,`bsi_db2`.`process_study`.`seq_3` AS `seq_3` from (((`bsi_db2`.`process_study` join `bsi_db2`.`process` on((`bsi_db2`.`process`.`id` = `bsi_db2`.`process_study`.`process_id`))) join `bsi_db2`.`labor_view` `lv` on((`lv`.`id` = `bsi_db2`.`process_study`.`party_id`))) join `bsi_db2`.`production_study` on((`bsi_db2`.`process_study`.`production_study_id` = `bsi_db2`.`production_study`.`id`)))
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
        DB::statement('DROP VIEW IF EXISTS process_study_view');
    }
}
