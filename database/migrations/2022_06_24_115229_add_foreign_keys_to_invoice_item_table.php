<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInvoiceItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('invoice_item', function(Blueprint $table)
		{
			$table->foreign('invoice_id', 'fk_invoice_item_invoice1')->references('id')->on('invoice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('invoice_item_type_id', 'fk_invoice_item_invoice_item_type1')->references('id')->on('invoice_item_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('order_item_id', 'fk_invoice_item_order_item1')->references('id')->on('order_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('invoice_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_invoice_item_invoice1');
			$table->dropForeign('fk_invoice_item_invoice_item_type1');
			$table->dropForeign('fk_invoice_item_order_item1');
		});
	}

}
