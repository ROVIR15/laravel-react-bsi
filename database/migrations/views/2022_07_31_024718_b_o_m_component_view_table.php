<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class BOMComponentViewTable extends Migration
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
        CREATE VIEW bom_component_views
        AS
        select `bsi_db`.`bom`.`id` AS `bom_id`,`bsi_db`.`bom_component`.`id` AS `bom_component_id`,`bsi_db`.`product`.`id` AS `product_id`,`bsi_db`.`product_feature`.`id` AS `product_feature_id`,`bsi_db`.`bom`.`name` AS `bom_name`,`bsi_db`.`goods`.`name` AS `goods_name`,`bsi_db`.`product_feature`.`size` AS `size`,`bsi_db`.`product_feature`.`color` AS `color`,`bsi_db`.`bom_component`.`qty` AS `qty_to_be_consumpted`,`bsi_db`.`goods`.`value` AS `price`,(`bsi_db`.`goods`.`value` * `bsi_db`.`bom_component`.`qty`) AS `total_goods_value` from ((((`bsi_db`.`bom` left join `bsi_db`.`bom_component` on((`bsi_db`.`bom`.`id` = `bsi_db`.`bom_component`.`bom_id`))) join `bsi_db`.`product_feature` on((`bsi_db`.`bom_component`.`product_feature_id` = `bsi_db`.`product_feature`.`id`))) join `bsi_db`.`product` on((`bsi_db`.`product_feature`.`product_id` = `bsi_db`.`product`.`id`))) join `bsi_db`.`goods` on((`bsi_db`.`product`.`goods_id` = `bsi_db`.`goods`.`id`)))
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
        DB::statement('DROP VIEW IF EXISTS bom_component_views');
    }
}
