<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LaborViewTable extends Migration
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
        CREATE VIEW labor_view
        AS
        select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`email` AS `email`,`p`.`npwp` AS `npwp`,`r`.`name` AS `type`,`a`.`street` AS `street`,`a`.`city` AS `city`,`a`.`province` AS `province`,`a`.`country` AS `country`,`a`.`postal_code` AS `postal_code` from (((`bsi_db`.`party` `p` left join `bsi_db`.`address` `a` on((`a`.`party_id` = `p`.`id`))) join `bsi_db`.`party_roles` `pr` on((`pr`.`party_id` = `p`.`id`))) left join `bsi_db`.`relationship` `r` on((`pr`.`relationship_id` = `r`.`id`))) where (`r`.`name` = 'Labor')
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
        DB::statement('DROP VIEW IF EXISTS labor_view');
    }
}
