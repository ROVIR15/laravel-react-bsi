<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GoodsReceiptItemsViewTable extends Migration
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
        CREATE VIEW goods_receipt_items_view
        AS
        select `gri`.`id` AS `id`,`gri`.`goods_receipt_id` AS `goods_receipt_id`,`oi`.`product_feature_id` AS `product_feature_id`,`gri`.`qty_received` AS `qty_received`,`gri`.`qty_on_receipt` AS `qty_on_receipt`,`oi`.`qty` AS `qty_order` from (`bsi_db2`.`goods_receipt_items` `gri` join `bsi_db2`.`order_item` `oi` on((`oi`.`id` = `gri`.`order_item_id`)))
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
        DB::statement('DROP VIEW IF EXISTS goods_receipt_items_view');
    }
}
