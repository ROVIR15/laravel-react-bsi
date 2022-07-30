<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToSalesInvoiceTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('sales_invoice', function(Blueprint $table)
		{
			$table->foreign('invoice_id', 'fk_invoice1')->references('id')->on('invoice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('sales_order_id', 'fk_sales_order1')->references('id')->on('sales_order')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('sales_invoice', function(Blueprint $table)
		{
			$table->dropForeign('fk_invoice1');
			$table->dropForeign('fk_sales_order1');
		});
	}

}
