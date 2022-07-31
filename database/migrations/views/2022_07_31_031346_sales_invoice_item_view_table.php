<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SalesInvoiceItemViewTable extends Migration
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
        CREATE VIEW sales_invoie_item_view
        AS
        select `item`.`id` AS `id`,`bsi_db`.`sales_invoice`.`id` AS `invoice_id`,`oi`.`product_feature_id` AS `product_feature_id`,`item`.`qty` AS `qty`,`item`.`amount` AS `amount` from (((`bsi_db`.`sales_invoice` join `bsi_db`.`invoice` `inv` on((`inv`.`id` = `bsi_db`.`sales_invoice`.`invoice_id`))) join `bsi_db`.`invoice_item` `item` on((`item`.`invoice_id` = `inv`.`id`))) join `bsi_db`.`order_item` `oi` on((`oi`.`id` = `item`.`order_item_id`)))
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
        DB::statement('DROP VIEW IF EXISTS sales_invoie_item_view');
    }
}
