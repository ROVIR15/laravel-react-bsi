<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToInvoiceStatusTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('invoice_status', function(Blueprint $table)
		{
			$table->foreign('invoice_id', 'fk_invoice_status_invoice')->references('id')->on('invoice')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('invoice_status_type_id', 'fk_invoice_status_invoice_status_type1')->references('id')->on('invoice_status_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('invoice_status', function(Blueprint $table)
		{
			$table->dropForeign('fk_invoice_status_invoice');
			$table->dropForeign('fk_invoice_status_invoice_status_type1');
		});
	}

}
