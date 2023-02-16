<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductInformationViewTable extends Migration
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
        CREATE VIEW product_information_view
        AS
        select `bsi_db2`.`product`.`id` AS `id`,`bsi_db2`.`goods`.`name` AS `name`,`bsi_db2`.`goods`.`brand` AS `brand`,`pc`.`name` AS `category` from (((`bsi_db2`.`goods` join `bsi_db2`.`product` on((`bsi_db2`.`product`.`goods_id` = `bsi_db2`.`goods`.`id`))) join `bsi_db2`.`product_has_category` `phc` on((`phc`.`product_id` = `bsi_db2`.`product`.`id`))) join `bsi_db2`.`product_category` `pc` on((`pc`.`id` = `phc`.`product_category_id`)))        ");

    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement('DROP VIEW IF EXISTS product_information_view');
    }
}
