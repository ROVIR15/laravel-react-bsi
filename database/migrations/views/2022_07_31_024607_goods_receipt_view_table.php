<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GoodsReceiptViewTable extends Migration
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
        CREATE VIEW goods_receipt_view
        AS
        select `bsi_db2`.`goods_receipt`.`id` AS `id`,`po`.`id` AS `purchase_order_id`,`po`.`po_number` AS `po_number`,`bsi_db2`.`goods_receipt`.`facility_id` AS `facility_id`,`po`.`bought_from` AS `bought_from`,`po`.`issue_date` AS `issue_date`,`po`.`delivery_date` AS `delivery_date`,`po`.`valid_thru` AS `valid_thru` from (`bsi_db2`.`goods_receipt` join `bsi_db2`.`purchase_order` `po` on((`po`.`id` = `bsi_db2`.`goods_receipt`.`purchase_order_id`)))
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
        DB::statement('DROP VIEW IF EXISTS goods_receipt_view');
    }
}
