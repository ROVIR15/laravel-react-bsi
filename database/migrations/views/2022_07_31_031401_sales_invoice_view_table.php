<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SalesInvoiceViewTable extends Migration
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
        CREATE VIEW sales_invoice_view
        AS
        select `bsi_db`.`sales_invoice`.`id` AS `id`,`inv`.`id` AS `invoice_id`,`so`.`po_number` AS `po_number`,`inv`.`invoice_date` AS `invoice_date`,`so`.`sold_to` AS `sold_to`,`so`.`ship_to` AS `ship_to`,`inv`.`description` AS `description`,sum(`item`.`qty`) AS `total_qty`,sum((`item`.`amount` * `item`.`qty`)) AS `total_price` from (((`bsi_db`.`sales_invoice` join `bsi_db`.`invoice` `inv` on((`inv`.`id` = `bsi_db`.`sales_invoice`.`invoice_id`))) join `bsi_db`.`invoice_item` `item` on((`item`.`invoice_id` = `inv`.`id`))) join `bsi_db`.`sales_order` `so` on((`so`.`id` = `bsi_db`.`sales_invoice`.`sales_order_id`)))        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
