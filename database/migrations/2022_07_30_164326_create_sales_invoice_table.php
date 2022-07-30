<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSalesInvoiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('sales_invoice', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('sales_order_id')->index('fk_sales_invoice_sales_order1_idx');
			$table->integer('invoice_id')->index('fk_sales_invoice_invoice1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('sales_invoice');
	}

}
