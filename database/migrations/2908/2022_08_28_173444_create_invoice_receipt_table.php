<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInvoiceReceiptTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invoice_receipt', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('purchase_order_id')->nullable()->index('fk_invoice_receipt_purchase_order1_idx');
			$table->string('amount', 45)->nullable();
			$table->string('qty', 45)->nullable();
			$table->string('invoice_date', 45)->nullable();
			$table->string('posting_date', 45)->nullable();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('invoice_receipt');
	}

}
