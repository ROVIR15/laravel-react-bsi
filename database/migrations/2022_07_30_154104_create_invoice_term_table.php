<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateInvoiceTermTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('invoice_term', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('invoice_item_id')->index('fk_invoice_term_invoice_item1_idx');
			$table->integer('term_type_id')->index('fk_invoice_term_term_type1_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('invoice_term');
	}

}
