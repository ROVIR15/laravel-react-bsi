<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToFinancialAccountTransactionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('financial_account_transaction', function(Blueprint $table)
		{
			$table->foreign('financial_account_id', 'fk_financial_acc_tx1')->references('id')->on('financial_account')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('financial_account_transaction', function(Blueprint $table)
		{
			$table->dropForeign('fk_financial_acc_tx1');
		});
	}

}
