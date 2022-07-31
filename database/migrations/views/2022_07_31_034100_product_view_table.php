<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProductViewTable extends Migration
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
        CREATE VIEW product_view
        AS
        select `pf`.`id` AS `product_feature_id`,`pf`.`product_id` AS `product_id`,`bsi_db`.`goods`.`name` AS `name`,`pc`.`name` AS `category`,`pf`.`color` AS `color`,`pf`.`size` AS `size`,`bsi_db`.`goods`.`imageUrl` AS `imageUrl` from ((((`bsi_db`.`goods` join `bsi_db`.`product` `p` on((`p`.`goods_id` = `bsi_db`.`goods`.`id`))) join `bsi_db`.`product_has_category` `phc` on((`phc`.`product_id` = `p`.`id`))) join `bsi_db`.`product_category` `pc` on((`pc`.`id` = `phc`.`product_category_id`))) join `bsi_db`.`product_feature` `pf` on((`pf`.`product_id` = `p`.`id`))) order by `pf`.`id`");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement('DROP VIEW IF EXISTS product_view');
    }
}
