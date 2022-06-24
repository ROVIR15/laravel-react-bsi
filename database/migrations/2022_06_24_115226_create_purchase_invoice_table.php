<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePurchaseInvoiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('purchase_invoice', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('purchase_order_id')->index('fk_purchase_invoice_purchase_order1_idx');
			$table->integer('invoice_id')->index('fk_purchase_invoice_invoice1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('purchase_invoice');
	}

}
