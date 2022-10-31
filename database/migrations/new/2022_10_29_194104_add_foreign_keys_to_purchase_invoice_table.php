<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToPurchaseInvoiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('purchase_invoice', function(Blueprint $table)
		{
			$table->foreign('invoice_id', 'fk_invoice')->references('id')->on('invoice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('purchase_order_id', 'fk_purchase_order1')->references('id')->on('purchase_order')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('purchase_invoice', function(Blueprint $table)
		{
			$table->dropForeign('fk_invoice');
			$table->dropForeign('fk_purchase_order1');
		});
	}

}
