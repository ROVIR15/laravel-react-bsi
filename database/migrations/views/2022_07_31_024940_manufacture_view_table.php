<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ManufactureViewTable extends Migration
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
        CREATE VIEW manufacture_view
        AS
        select `mf`.`id` AS `id`,`mhb`.`bom_id` AS `bom_id`,`mf`.`party_id` AS `party_id`,`mf`.`qty` AS `qty`,`mf`.`start_date` AS `start_date`,`mf`.`end_date` AS `end_date`,`mf`.`created_at` AS `created_at`,`mf`.`updated_at` AS `updated_at` from (`bsi_db`.`manufacture_has_bom` `mhb` join `bsi_db`.`manufacture` `mf` on((`mf`.`id` = `mhb`.`manufacture_id`)))
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
        DB::statement('DROP VIEW IF EXISTS manufacture_view');
    }
}
