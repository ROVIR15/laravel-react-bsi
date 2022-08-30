<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InventoryItemsViewTable extends Migration
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
        CREATE VIEW inventory_item_view
        AS
        select `bsi_db2`.`inventory_item`.`id` AS `id`,`bsi_db2`.`inventory_item`.`inventory_type_id` AS `inventory_type_id`,`bsi_db2`.`inventory_item`.`product_feature_id` AS `product_feature_id`,`bsi_db2`.`inventory_item`.`facility_id` AS `facility_id`,sum(`bsi_db2`.`inventory_item`.`qty_on_hand`) AS `qty`,`bsi_db2`.`inventory_item`.`qty_on_hand` AS `qty_on_hand` from `bsi_db2`.`inventory_item` group by `bsi_db2`.`inventory_item`.`product_feature_id` order by sum(`bsi_db2`.`inventory_item`.`qty_on_hand`) desc        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement('DROP VIEW IF EXISTS inventory_item_view');
    }
}
