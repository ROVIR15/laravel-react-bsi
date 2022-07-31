<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PagesAccessViewTable extends Migration
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
        CREATE VIEW pages_access_view
        AS
        select `bsi_db`.`users`.`id` AS `users_id`,`bsi_db`.`pages_access`.`pages_id` AS `pages_id`,`bsi_db`.`pages_access`.`name` AS `page_name` from (`bsi_db`.`users` join `bsi_db`.`pages_access` on((`bsi_db`.`pages_access`.`users_id` = `bsi_db`.`users`.`id`)))
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
        DB::statement('DROP VIEW IF EXISTS pages_access_view');
    }
}
