<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInvoiceReceiptItemsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invoice_receipt_items', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('invoice_receipt_id')->nullable()->index('fk_invoice_receipt_items_invoice_receipt1_idx');
			$table->integer('order_item_id')->nullable();
			$table->integer('order_item_order_id')->nullable();
			$table->string('amount', 45)->nullable();
			$table->string('qty', 45)->nullable();
			$table->timestamps();
			$table->index(['order_item_id','order_item_order_id'], 'fk_invoice_receipt_items_order_item1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('invoice_receipt_items');
	}

}
