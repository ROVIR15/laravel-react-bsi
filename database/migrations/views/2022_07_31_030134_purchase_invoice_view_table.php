<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PurchaseInvoiceViewTable extends Migration
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
        CREATE VIEW purchase_invoice_view
        AS
        select `pf`.`id` AS `product_feature_id`,`pf`.`product_id` AS `product_id`,`bsi_db2`.`goods`.`name` AS `name`,`pc`.`name` AS `category`,`pf`.`color` AS `color`,`pf`.`size` AS `size` from ((((`bsi_db2`.`goods` join `bsi_db2`.`product` `p` on((`p`.`goods_id` = `bsi_db2`.`goods`.`id`))) join `bsi_db2`.`product_has_category` `phc` on((`phc`.`product_id` = `p`.`id`))) join `bsi_db2`.`product_category` `pc` on((`pc`.`id` = `phc`.`product_category_id`))) join `bsi_db2`.`product_feature` `pf` on((`pf`.`product_id` = `p`.`id`))) order by `pf`.`id`        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement('DROP VIEW IF EXISTS purchase_invoice');
    }
}
