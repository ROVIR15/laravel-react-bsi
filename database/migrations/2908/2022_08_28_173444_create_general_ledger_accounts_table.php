<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateGeneralLedgerAccountsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('general_ledger_accounts', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('gl_type_id')->index('fk_gl_acc1');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('general_ledger_accounts');
	}

}
