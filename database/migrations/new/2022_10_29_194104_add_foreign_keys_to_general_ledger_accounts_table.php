<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToGeneralLedgerAccountsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('general_ledger_accounts', function(Blueprint $table)
		{
			$table->foreign('gl_type_id', 'fk_gl_acc1')->references('id')->on('gl_type')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('general_ledger_accounts', function(Blueprint $table)
		{
			$table->dropForeign('fk_gl_acc1');
		});
	}

}
