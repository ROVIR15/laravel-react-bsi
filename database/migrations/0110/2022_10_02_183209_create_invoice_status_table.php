<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInvoiceStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invoice_status', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('invoice_id')->index('fk_invoice_status_invoice1_idx');
			$table->integer('invoice_status_type_id')->index('fk_invoice_status_invoice_status_type1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('invoice_status');
	}

}
