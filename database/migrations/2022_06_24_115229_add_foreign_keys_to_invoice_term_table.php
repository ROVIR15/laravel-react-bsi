<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInvoiceTermTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('invoice_term', function(Blueprint $table)
		{
			$table->foreign('invoice_item_id', 'fk_invoice_term_invoice_item1')->references('id')->on('invoice_item')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('term_type_id', 'fk_invoice_term_term_type1')->references('id')->on('term_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('invoice_term', function(Blueprint $table)
		{
			$table->dropForeign('fk_invoice_term_invoice_item1');
			$table->dropForeign('fk_invoice_term_term_type1');
		});
	}

}
