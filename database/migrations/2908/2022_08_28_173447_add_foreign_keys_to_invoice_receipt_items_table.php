<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInvoiceReceiptItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('invoice_receipt_items', function(Blueprint $table)
		{
			$table->foreign('invoice_receipt_id', 'fk_invoice_receipt_items_invoice_receipt1')->references('id')->on('invoice_receipt')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('order_item_id', 'fk_invoice_receipt_items_order_item1')->references('id')->on('order_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('invoice_receipt_items', function(Blueprint $table)
		{
			$table->dropForeign('fk_invoice_receipt_items_invoice_receipt1');
			$table->dropForeign('fk_invoice_receipt_items_order_item1');
		});
	}

}
